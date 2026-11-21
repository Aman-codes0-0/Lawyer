const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET /api/appointments - fetch all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(appointments);
  } catch (error) {
    console.error("[Fetch Appointments Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/appointments - create a new appointment booking
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, caseType, date, time, message } = req.body;

    if (!name || !phone || !email || !caseType || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName: name,
        phone,
        email,
        caseType,
        preferredDate: new Date(date),
        preferredTime: time,
        message: message || null,
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error("[Create Appointment Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH /api/appointments/:id - update appointment status
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const validStatuses = ["PENDING", "APPROVED", "REJECTED", "RESCHEDULED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return res.json(appointment);
  } catch (error) {
    console.error("[Update Appointment Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/appointments/:id - delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({ where: { id } });
    return res.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.error("[Delete Appointment Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

