const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET /api/enquiries - fetch all contact enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(enquiries);
  } catch (error) {
    console.error("[Fetch Enquiries Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/enquiries - submit a new contact enquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name,
        email,
        phone: phone || "",
        subject,
        message,
      },
    });

    return res.status(201).json(enquiry);
  } catch (error) {
    console.error("[Create Enquiry Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH /api/enquiries/:id - update enquiry status
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const enquiry = await prisma.contactEnquiry.update({
      where: { id },
      data: { status },
    });

    return res.json(enquiry);
  } catch (error) {
    console.error("[Update Enquiry Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/enquiries/:id - delete enquiry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactEnquiry.delete({ where: { id } });
    return res.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    console.error("[Delete Enquiry Error]", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

