require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
