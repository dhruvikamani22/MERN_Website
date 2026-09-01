const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects - list all projects, ordered
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/projects - create a new project
router.post("/", async (req, res) => {
  try {
    const { title, description, tags, link, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }

    const project = await Project.create({ title, description, tags, link, order });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT /api/projects/:id - update a project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/projects/:id - remove a project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
