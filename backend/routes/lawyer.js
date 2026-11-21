const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const JWT_SECRET = process.env.JWT_SECRET || "lexprime_super_secret_jwt_key_2026_lawyer";

// Helper to sign JWT token
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/lawyer/register - register a new lawyer account
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      designation,
      specialization,
      experience,
      education,
      barRegistration,
      languages,
    } = req.body;

    if (!name || !email || !password || !designation || !specialization || !experience || !education || !barRegistration) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    // Check if email already registered
    const existingEmail = await prisma.lawyer.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    // Check if barRegistration already claimed
    const existingBar = await prisma.lawyer.findUnique({ where: { barRegistration } });
    if (existingBar && existingBar.email) {
      return res.status(409).json({ error: "This bar registration number is already linked to an account." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let lawyer;
    if (existingBar) {
      lawyer = await prisma.lawyer.update({
        where: { barRegistration },
        data: {
          name,
          email,
          password: hashedPassword,
          designation,
          specialization,
          experience: parseInt(experience, 10) || 0,
          education,
          languages: languages || "English",
          isVerified: false,
        },
      });
    } else {
      lawyer = await prisma.lawyer.create({
        data: {
          name,
          email,
          password: hashedPassword,
          designation,
          specialization,
          experience: parseInt(experience, 10) || 0,
          education,
          barRegistration,
          languages: languages || "English",
          isVerified: false,
        },
      });
    }

    const token = signToken({
      id: lawyer.id,
      name: lawyer.name,
      email: lawyer.email,
      designation: lawyer.designation,
      specialization: lawyer.specialization,
    });

    res.cookie("lawyer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      message: "Account created successfully.",
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        email: lawyer.email,
        designation: lawyer.designation,
        specialization: lawyer.specialization,
      },
    });
  } catch (error) {
    console.error("[Lawyer Register Error]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/lawyer/login - lawyer login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const lawyer = await prisma.lawyer.findUnique({ where: { email } });

    if (!lawyer || !lawyer.password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isValid = await bcrypt.compare(password, lawyer.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = signToken({
      id: lawyer.id,
      name: lawyer.name,
      email: lawyer.email,
      designation: lawyer.designation,
      specialization: lawyer.specialization,
    });

    res.cookie("lawyer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({
      message: "Login successful.",
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        email: lawyer.email,
        designation: lawyer.designation,
        specialization: lawyer.specialization,
        experience: lawyer.experience,
        barRegistration: lawyer.barRegistration,
        photoUrl: lawyer.photoUrl,
        isVerified: lawyer.isVerified,
      },
    });
  } catch (error) {
    console.error("[Lawyer Login Error]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/lawyer/me - fetch current authenticated lawyer session
router.get("/me", async (req, res) => {
  try {
    const token =
      req.cookies?.lawyer_token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ error: "Not authenticated." });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    const lawyer = await prisma.lawyer.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        designation: true,
        specialization: true,
        experience: true,
        education: true,
        barRegistration: true,
        languages: true,
        photoUrl: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer profile not found." });
    }

    return res.json({ lawyer });
  } catch (error) {
    console.error("[Lawyer Me Error]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/lawyer/logout - clear lawyer authentication session
router.post("/logout", (req, res) => {
  res.clearCookie("lawyer_token", { path: "/" });
  return res.json({ message: "Logged out successfully." });
});

// GET /api/lawyer/list - public list of all lawyers for directory
router.get("/list", async (req, res) => {
  try {
    const lawyers = await prisma.lawyer.findMany({
      select: {
        id: true,
        name: true,
        designation: true,
        specialization: true,
        experience: true,
        education: true,
        barRegistration: true,
        languages: true,
        photoUrl: true,
        isVerified: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json(lawyers);
  } catch (error) {
    console.error("[Fetch Lawyers Error]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;

