import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { db, id, now } from "./db.js";

const app = new Hono();
const port = Number(process.env.PORT || 5000);
const jwtSecret = new TextEncoder().encode(
  process.env.JWT_SECRET || "lexprime_super_secret_jwt_key_2026_lawyer"
);
const adminEmail = process.env.ADMIN_EMAIL || "admin@lexprime.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

app.use("/api/*", cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(jwtSecret);
}

async function requireRole(c, next, role) {
  const bearer = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const cookieName = role === "ADMIN" ? "admin_token" : "lawyer_token";
  const token = bearer || getCookie(c, cookieName);

  if (!token) return c.json({ error: "Not authenticated." }, 401);

  try {
    const { payload } = await jwtVerify(token, jwtSecret);
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

app.get("/api/health", (c) => c.json({
  status: "ok",
  service: "LexPrime Hono API",
  uptime: Math.floor(process.uptime()),
}));

app.get("/api/appointments", (c) => {
  const rows = db.prepare(
    "SELECT * FROM appointments ORDER BY createdAt DESC"
  ).all();
  return c.json(rows);
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

  db.prepare(`
    INSERT INTO appointments
      (id, clientName, email, phone, caseType, preferredDate, preferredTime, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    appointment.id, appointment.clientName, appointment.email, appointment.phone,
    appointment.caseType, appointment.preferredDate, appointment.preferredTime,
    appointment.message, appointment.status, appointment.createdAt
  );

  return c.json(appointment, 201);
});

app.patch("/api/appointments/:id", async (c) => {
  const body = await c.req.json();
  const result = db.prepare(
    "UPDATE appointments SET status = ? WHERE id = ?"
  ).run(String(body.status || "PENDING"), c.req.param("id"));
  if (!result.changes) return c.json({ error: "Appointment not found." }, 404);
  const row = db.prepare("SELECT * FROM appointments WHERE id = ?")
    .get(c.req.param("id"));
  return c.json(row);
});

app.delete("/api/appointments/:id", (c) => {
  const result = db.prepare("DELETE FROM appointments WHERE id = ?")
    .run(c.req.param("id"));
  if (!result.changes) return c.json({ error: "Appointment not found." }, 404);
  return c.json({ message: "Appointment deleted." });
});

app.get("/api/enquiries", (c) => c.json(
  db.prepare("SELECT * FROM enquiries ORDER BY createdAt DESC").all()
));

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

  db.prepare(`
    INSERT INTO enquiries
      (id, name, email, phone, subject, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    enquiry.id, enquiry.name, enquiry.email, enquiry.phone,
    enquiry.subject, enquiry.message, enquiry.status, enquiry.createdAt
  );
  return c.json(enquiry, 201);
});

app.patch("/api/enquiries/:id", async (c) => {
  const body = await c.req.json();
  const status = body.status === "UNREAD" ? "UNREAD" : "READ";
  const result = db.prepare("UPDATE enquiries SET status = ? WHERE id = ?")
    .run(status, c.req.param("id"));
  if (!result.changes) return c.json({ error: "Enquiry not found." }, 404);
  return c.json(db.prepare("SELECT * FROM enquiries WHERE id = ?").get(c.req.param("id")));
});

app.delete("/api/enquiries/:id", (c) => {
  const result = db.prepare("DELETE FROM enquiries WHERE id = ?")
    .run(c.req.param("id"));
  if (!result.changes) return c.json({ error: "Enquiry not found." }, 404);
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

  const existing = db.prepare("SELECT id FROM lawyers WHERE email = ?")
    .get(String(body.email).trim().toLowerCase());
  if (existing) return c.json({ error: "A lawyer with this email already exists." }, 409);

  const lawyer = {
    id: body.id || id("lawyer"),
    name: String(body.name).trim(),
    email: String(body.email).trim().toLowerCase(),
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

  db.prepare(`
    INSERT INTO lawyers
      (id, name, email, passwordHash, designation, specialization, experience,
       barRegistration, education, languages, photoUrl, isVerified, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    lawyer.id, lawyer.name, lawyer.email, lawyer.passwordHash, lawyer.designation,
    lawyer.specialization, lawyer.experience, lawyer.barRegistration,
    lawyer.education, lawyer.languages, lawyer.photoUrl, lawyer.isVerified, lawyer.createdAt
  );

  const token = await signToken({ email: lawyer.email, role: "LAWYER", lawyerId: lawyer.id });
  setCookie(c, "lawyer_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 86400,
  });

  const row = db.prepare("SELECT * FROM lawyers WHERE id = ?").get(lawyer.id);
  return c.json({ message: "Lawyer registered successfully.", lawyer: publicLawyer(row), token }, 201);
});

app.post("/api/lawyer/login", async (c) => {
  const body = await c.req.json();
  const row = db.prepare("SELECT * FROM lawyers WHERE email = ?")
    .get(String(body.email || "").trim().toLowerCase());

  if (!row || !(await bcrypt.compare(String(body.password || ""), row.passwordHash))) {
    return c.json({ error: "Invalid lawyer credentials." }, 401);
  }

  const token = await signToken({ email: row.email, role: "LAWYER", lawyerId: row.id });
  setCookie(c, "lawyer_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 86400,
  });
  return c.json({ message: "Lawyer login successful.", lawyer: publicLawyer(row), token });
});

app.get("/api/lawyer/me", async (c) => {
  const bearer = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const token = bearer || getCookie(c, "lawyer_token");
  if (!token) return c.json({ error: "Not authenticated." }, 401);
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    if (payload.role !== "LAWYER") return c.json({ error: "Forbidden." }, 403);
    const row = db.prepare("SELECT * FROM lawyers WHERE id = ?").get(payload.lawyerId);
    if (!row) return c.json({ error: "Lawyer not found." }, 404);
    return c.json({ lawyer: publicLawyer(row) });
  } catch {
    return c.json({ error: "Invalid or expired session." }, 401);
  }
});

app.post("/api/lawyer/logout", (c) => {
  deleteCookie(c, "lawyer_token", { path: "/" });
  return c.json({ message: "Logged out." });
});

app.get("/api/lawyer/list", (c) => c.json(
  db.prepare("SELECT * FROM lawyers ORDER BY createdAt DESC").all()
    .map(publicLawyer)
));

app.post("/api/admin/login", async (c) => {
  const body = await c.req.json();
  if (body.email !== adminEmail || body.password !== adminPassword) {
    return c.json({ error: "Invalid admin credentials." }, 401);
  }

  const token = await signToken({ email: adminEmail, role: "ADMIN" });
  setCookie(c, "admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 86400,
  });
  return c.json({
    message: "Admin login successful.",
    admin: { email: adminEmail, role: "ADMIN" },
    token,
  });
});

app.get("/api/admin/stats", async (c, next) => requireRole(c, next, "ADMIN"), (c) => c.json({
  appointmentsCount: db.prepare("SELECT COUNT(*) AS count FROM appointments").get().count,
  pendingAppointments: db.prepare("SELECT COUNT(*) AS count FROM appointments WHERE status = 'PENDING'").get().count,
  enquiriesCount: db.prepare("SELECT COUNT(*) AS count FROM enquiries").get().count,
  unreadEnquiries: db.prepare("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'UNREAD'").get().count,
  lawyersCount: db.prepare("SELECT COUNT(*) AS count FROM lawyers").get().count,
}));

app.get("/api/admin/lawyers", async (c, next) => requireRole(c, next, "ADMIN"), (c) => c.json(
  db.prepare("SELECT * FROM lawyers ORDER BY createdAt DESC").all().map(publicLawyer)
));

app.patch("/api/admin/lawyers/:id/verify", async (c, next) => requireRole(c, next, "ADMIN"), async (c) => {
  const body = await c.req.json();
  const isVerified = body.isVerified ? 1 : 0;
  const result = db.prepare("UPDATE lawyers SET isVerified = ? WHERE id = ?")
    .run(isVerified, c.req.param("id"));
  if (!result.changes) return c.json({ error: "Lawyer not found." }, 404);
  return c.json(publicLawyer(db.prepare("SELECT * FROM lawyers WHERE id = ?").get(c.req.param("id"))));
});

app.onError((err, c) => {
  console.error("[LexPrime API Error]", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

app.notFound((c) => c.json({ error: "Not Found" }, 404));

console.log(`LexPrime Hono API listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
