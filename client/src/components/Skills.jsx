const SKILLS = [
  { name: "HTML / CSS", level: 95, icon: "bxl-html5" },
  { name: "JavaScript", level: 85, icon: "bxl-javascript" },
  { name: "React", level: 80, icon: "bxl-react" },
  { name: "Node.js / Express", level: 70, icon: "bxl-nodejs" },
  { name: "MongoDB", level: 65, icon: "bx-data" },
  { name: "UI / UX Design", level: 88, icon: "bx-palette" },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">
        My <span>Skills</span>
      </h2>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <i className={`bx ${skill.icon}`}></i>
            <h3>{skill.name}</h3>
            <div className="skill-bar">
              <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
