require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Project = require("./models/Project");

const sampleProjects = [
  {
    title: "Personal Portfolio v1",
    description: "A single-page portfolio built with vanilla HTML, CSS and JS featuring a typed-text hero section.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
    order: 1,
  },
  {
    title: "Landing Page Redesign",
    description: "Redesigned a client landing page focusing on responsive layout and micro-interactions.",
    tags: ["Figma", "CSS", "Responsive Design"],
    link: "#",
    order: 2,
  },
  {
    title: "E-commerce UI Kit",
    description: "A reusable component library for e-commerce storefronts, including cards, filters and modals.",
    tags: ["React", "UI/UX"],
    link: "#",
    order: 3,
  },
];

async function seed() {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
  console.log(`Seeded ${sampleProjects.length} projects.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
