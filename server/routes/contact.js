const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST /api/contact - submit the contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    const saved = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET /api/contact - list submitted messages (e.g. for an admin view)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
