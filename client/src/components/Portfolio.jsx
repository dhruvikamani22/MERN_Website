import { useEffect, useState } from "react";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProjects(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="portfolio" className="portfolio">
      <h2 className="section-title">
        My <span>Portfolio</span>
      </h2>

      {status === "loading" && <p className="portfolio-loading">Loading projects…</p>}

      {status === "error" && (
        <p className="portfolio-empty">
          Couldn't load projects. Make sure the API server is running and seeded (`npm run seed`
          in the server folder).
        </p>
      )}

      {status === "ready" && projects.length === 0 && (
        <p className="portfolio-empty">No projects yet — add some via the API.</p>
      )}

      {status === "ready" && projects.length > 0 && (
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div className="portfolio-card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="portfolio-tags">
                {(project.tags || []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href={project.link || "#"} target="_blank" rel="noreferrer">
                View Project →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
