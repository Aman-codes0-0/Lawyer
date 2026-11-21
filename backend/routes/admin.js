const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const JWT_SECRET = process.env.JWT_SECRET || "lexprime_super_secret_jwt_key_2026_lawyer";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lexprime.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// POST /api/admin/login - admin authentication
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: "ADMIN" }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({
      message: "Admin login successful",
      admin: { email, role: "ADMIN" },
      token,
    });
  }

  return res.status(401).json({ error: "Invalid admin credentials. Use admin@lexprime.com / admin123" });
});

// GET /api/admin/stats - dashboard analytics
router.get("/stats", async (req, res) => {
  try {
    const [appointmentsCount, enquiriesCount, lawyersCount] = await Promise.all([
      prisma.appointment.count(),
      prisma.contactEnquiry.count(),
      prisma.lawyer.count(),
    ]);

    const pendingAppointments = await prisma.appointment.count({
      where: { status: "PENDING" },
    });

    const unreadEnquiries = await prisma.contactEnquiry.count({
      where: { status: "UNREAD" },
    });

    return res.json({
      appointmentsCount,
      pendingAppointments,
      enquiriesCount,
      unreadEnquiries,
      lawyersCount,
    });
  } catch (error) {
    console.error("[Admin Stats Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/admin/lawyers - get all lawyers with full management info
router.get("/lawyers", async (req, res) => {
  try {
    const lawyers = await prisma.lawyer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(lawyers);
  } catch (error) {
    console.error("[Admin Lawyers Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH /api/admin/lawyers/:id/verify - toggle verification
router.patch("/lawyers/:id/verify", async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    const lawyer = await prisma.lawyer.update({
      where: { id },
      data: { isVerified: Boolean(isVerified) },
    });

    return res.json(lawyer);
  } catch (error) {
    console.error("[Verify Lawyer Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

