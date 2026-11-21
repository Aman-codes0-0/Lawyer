import { Hono } from "hono";
import { cors } from "hono/cors";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const app = new Hono();

app.use("/api/*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

function getJwtSecret(env) {
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
  return new TextEncoder().encode(env.JWT_SECRET);
}

async function signToken(payload, env) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(getJwtSecret(env));
}

async function requireRole(c, next, role) {
  const bearer = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const cookieName = role === "ADMIN" ? "admin_token" : "lawyer_token";
  const token = bearer || getCookie(c, cookieName);
  if (!token) return c.json({ error: "Not authenticated." }, 401);

  try {
    const { payload } = await jwtVerify(token, getJwtSecret(c.env));
    if (payload.role !== role) return c.json({ error: "Forbidden." }, 403);
    c.set("auth", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired session." }, 401);
  }
}

function publicLawyer(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    designation: row.designation,
    specialization: row.specialization,
    experience: row.experience,
    barRegistration: row.barRegistration,
    education: row.education,
    languages: row.languages,
    photoUrl: row.photoUrl,
    isVerified: Boolean(row.isVerified),
  };
}

function cookieOptions(c) {
  return {
    httpOnly: true,
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: 86400,
  };
}

function now() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

app.get("/api/health", (c) => c.json({
  status: "ok",
  service: "LexPrime Hono API",
  timestamp: now(),
}));

app.get("/api/appointments", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM appointments ORDER BY createdAt DESC"
  ).all();
  return c.json(results);
});

app.post("/api/appointments", async (c) => {
  const body = await c.req.json();
  if (!body.name || !body.email) {
    return c.json({ error: "Name and email are required." }, 400);
  }

  const appointment = {
    id: id("apt"),
    clientName: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: body.phone ? String(body.phone).trim() : "",
    caseType: body.caseType || "General Consultation",
    preferredDate: body.date || body.preferredDate || null,
    preferredTime: body.time || body.preferredTime || null,
    message: body.message || "",
    status: "PENDING",
    createdAt: now(),
  };

  await c.env.DB.prepare(`
    INSERT INTO appointments
      (id, clientName, email, phone, caseType, preferredDate, preferredTime, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    appointment.id, appointment.clientName, appointment.email, appointment.phone,
    appointment.caseType, appointment.preferredDate, appointment.preferredTime,
    appointment.message, appointment.status, appointment.createdAt
  ).run();

  return c.json(appointment, 201);
});

app.patch("/api/appointments/:id", async (c) => {
  const body = await c.req.json();
  const { meta } = await c.env.DB.prepare(
    "UPDATE appointments SET status = ? WHERE id = ?"
  ).bind(String(body.status || "PENDING"), c.req.param("id")).run();
  if (!meta.changes) return c.json({ error: "Appointment not found." }, 404);
  const row = await c.env.DB.prepare("SELECT * FROM appointments WHERE id = ?")
    .bind(c.req.param("id")).first();
  return c.json(row);
});

app.delete("/api/appointments/:id", async (c) => {
  const { meta } = await c.env.DB.prepare("DELETE FROM appointments WHERE id = ?")
    .bind(c.req.param("id")).run();
  if (!meta.changes) return c.json({ error: "Appointment not found." }, 404);
  return c.json({ message: "Appointment deleted." });
});

app.get("/api/enquiries", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM enquiries ORDER BY createdAt DESC"
  ).all();
  return c.json(results);
});

app.post("/api/enquiries", async (c) => {
  const body = await c.req.json();
  if (!body.email || !body.message) {
    return c.json({ error: "Email and message are required." }, 400);
  }

  const enquiry = {
    id: id("enq"),
    name: body.name ? String(body.name).trim() : "",
    email: String(body.email).trim(),
    phone: body.phone ? String(body.phone).trim() : "",
    subject: body.subject || "Support Query",
    message: String(body.message),
    status: "UNREAD",
    createdAt: now(),
  };

  await c.env.DB.prepare(`
    INSERT INTO enquiries
      (id, name, email, phone, subject, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    enquiry.id, enquiry.name, enquiry.email, enquiry.phone,
    enquiry.subject, enquiry.message, enquiry.status, enquiry.createdAt
  ).run();
  return c.json(enquiry, 201);
});

app.patch("/api/enquiries/:id", async (c) => {
  const body = await c.req.json();
  const status = body.status === "UNREAD" ? "UNREAD" : "READ";
  const { meta } = await c.env.DB.prepare(
    "UPDATE enquiries SET status = ? WHERE id = ?"
  ).bind(status, c.req.param("id")).run();
  if (!meta.changes) return c.json({ error: "Enquiry not found." }, 404);
  return c.json(await c.env.DB.prepare("SELECT * FROM enquiries WHERE id = ?")
    .bind(c.req.param("id")).first());
});

app.delete("/api/enquiries/:id", async (c) => {
  const { meta } = await c.env.DB.prepare("DELETE FROM enquiries WHERE id = ?")
    .bind(c.req.param("id")).run();
  if (!meta.changes) return c.json({ error: "Enquiry not found." }, 404);
  return c.json({ message: "Enquiry deleted." });
});

app.post("/api/lawyer/register", async (c) => {
  const body = await c.req.json();
  if (!body.name || !body.email || !body.password) {
    return c.json({ error: "Name, email and password are required." }, 400);
  }
  if (String(body.password).length < 8) {
    return c.json({ error: "Password must be at least 8 characters." }, 400);
  }

  const email = String(body.email).trim().toLowerCase();
  const existing = await c.env.DB.prepare("SELECT id FROM lawyers WHERE email = ?")
    .bind(email).first();
  if (existing) return c.json({ error: "A lawyer with this email already exists." }, 409);

  const lawyer = {
    id: id("lawyer"),
    name: String(body.name).trim(),
    email,
    passwordHash: await bcrypt.hash(String(body.password), 12),
    designation: body.designation || "Senior Advocate",
    specialization: body.specialization || "Corporate Law",
    experience: Number(body.experience) || 5,
    barRegistration: body.barRegistration || null,
    education: body.education || null,
    languages: body.languages || "English",
    photoUrl: body.photoUrl || null,
    isVerified: body.isVerified ? 1 : 0,
    createdAt: now(),
  };

  await c.env.DB.prepare(`
    INSERT INTO lawyers
      (id, name, email, passwordHash, designation, specialization, experience,
       barRegistration, education, languages, photoUrl, isVerified, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    lawyer.id, lawyer.name, lawyer.email, lawyer.passwordHash, lawyer.designation,
    lawyer.specialization, lawyer.experience, lawyer.barRegistration,
    lawyer.education, lawyer.languages, lawyer.photoUrl, lawyer.isVerified, lawyer.createdAt
  ).run();

  const token = await signToken({ email: lawyer.email, role: "LAWYER", lawyerId: lawyer.id }, c.env);
  setCookie(c, "lawyer_token", token, cookieOptions(c));
  return c.json({
    message: "Lawyer registered successfully.",
    lawyer: publicLawyer(lawyer),
    token,
  }, 201);
});

app.post("/api/lawyer/login", async (c) => {
  const body = await c.req.json();
  const row = await c.env.DB.prepare("SELECT * FROM lawyers WHERE email = ?")
    .bind(String(body.email || "").trim().toLowerCase()).first();
  if (!row || !(await bcrypt.compare(String(body.password || ""), row.passwordHash))) {
    return c.json({ error: "Invalid lawyer credentials." }, 401);
  }

  const token = await signToken({ email: row.email, role: "LAWYER", lawyerId: row.id }, c.env);
  setCookie(c, "lawyer_token", token, cookieOptions(c));
  return c.json({ message: "Lawyer login successful.", lawyer: publicLawyer(row), token });
});

app.get("/api/lawyer/me", async (c) => {
  const bearer = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const token = bearer || getCookie(c, "lawyer_token");
  if (!token) return c.json({ error: "Not authenticated." }, 401);
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(c.env));
    if (payload.role !== "LAWYER") return c.json({ error: "Forbidden." }, 403);
    const lawyer = await c.env.DB.prepare("SELECT * FROM lawyers WHERE id = ?")
      .bind(payload.lawyerId).first();
    if (!lawyer) return c.json({ error: "Lawyer not found." }, 404);
    return c.json({ lawyer: publicLawyer(lawyer) });
  } catch {
    return c.json({ error: "Invalid or expired session." }, 401);
  }
});

app.post("/api/lawyer/logout", (c) => {
  deleteCookie(c, "lawyer_token", { path: "/" });
  return c.json({ message: "Logged out." });
});

app.get("/api/lawyer/list", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM lawyers ORDER BY createdAt DESC"
  ).all();
  return c.json(results.map(publicLawyer));
});

app.post("/api/admin/login", async (c) => {
  const body = await c.req.json();
  if (!c.env.ADMIN_EMAIL || !c.env.ADMIN_PASSWORD) {
    return c.json({ error: "Admin credentials are not configured." }, 503);
  }
  if (body.email !== c.env.ADMIN_EMAIL || body.password !== c.env.ADMIN_PASSWORD) {
    return c.json({ error: "Invalid admin credentials." }, 401);
  }

  const token = await signToken({ email: c.env.ADMIN_EMAIL, role: "ADMIN" }, c.env);
  setCookie(c, "admin_token", token, cookieOptions(c));
  return c.json({
    message: "Admin login successful.",
    admin: { email: c.env.ADMIN_EMAIL, role: "ADMIN" },
    token,
  });
});

app.get("/api/admin/stats", async (c, next) => requireRole(c, next, "ADMIN"), async (c) => {
  const queries = await Promise.all([
    c.env.DB.prepare("SELECT COUNT(*) AS count FROM appointments").first(),
    c.env.DB.prepare("SELECT COUNT(*) AS count FROM appointments WHERE status = 'PENDING'").first(),
    c.env.DB.prepare("SELECT COUNT(*) AS count FROM enquiries").first(),
    c.env.DB.prepare("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'UNREAD'").first(),
    c.env.DB.prepare("SELECT COUNT(*) AS count FROM lawyers").first(),
  ]);
  return c.json({
    appointmentsCount: queries[0].count,
    pendingAppointments: queries[1].count,
    enquiriesCount: queries[2].count,
    unreadEnquiries: queries[3].count,
    lawyersCount: queries[4].count,
  });
});

app.get("/api/admin/lawyers", async (c, next) => requireRole(c, next, "ADMIN"), async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM lawyers ORDER BY createdAt DESC"
  ).all();
  return c.json(results.map(publicLawyer));
});

app.patch("/api/admin/lawyers/:id/verify", async (c, next) => requireRole(c, next, "ADMIN"), async (c) => {
  const body = await c.req.json();
  const { meta } = await c.env.DB.prepare("UPDATE lawyers SET isVerified = ? WHERE id = ?")
    .bind(body.isVerified ? 1 : 0, c.req.param("id")).run();
  if (!meta.changes) return c.json({ error: "Lawyer not found." }, 404);
  const lawyer = await c.env.DB.prepare("SELECT * FROM lawyers WHERE id = ?")
    .bind(c.req.param("id")).first();
  return c.json(publicLawyer(lawyer));
});

app.onError((error, c) => {
  console.error("[LexPrime Worker Error]", error);
  return c.json({ error: "Internal Server Error" }, 500);
});

app.notFound((c) => c.json({ error: "Not Found" }, 404));

export default app;
