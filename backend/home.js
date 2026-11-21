require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const appointmentsRouter = require("./routes/appointments");
const enquiriesRouter = require("./routes/enquiries");
const lawyerRouter = require("./routes/lawyer");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middlewares
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api/appointments", appointmentsRouter);
app.use("/api/enquiries", enquiriesRouter);
app.use("/api/lawyer", lawyerRouter);
app.use("/api/admin", adminRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    server: "Node.js (home.js)",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Root route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>LawFirm Backend</title></head>
      <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
        <h1 style="color: #d97706;">âš–ï¸  LawFirm Backend Server (home.js)</h1>
        <p>The Node.js Express API server is active and listening on port <strong>${PORT}</strong>.</p>
        <p>Health check endpoint: <a href="/api/health" style="color: #38bdf8;">/api/health</a></p>
      </body>
    </html>
  `);
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found", path: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  LawFirm Backend Server running on home.js           `);
  console.log(`  Port: ${PORT}                                       `);
  console.log(`  Health Check: http://localhost:${PORT}/api/health        `);
  console.log(`=======================================================`);
});

module.exports = app;

