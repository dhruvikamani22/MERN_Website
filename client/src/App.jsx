import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

const SECTION_IDS = ["home", "about", "skills", "portfolio", "contact"];

export default function App() {
  const [active, setActive] = useState("home");
  const sectionRefs = useRef({});

  const handleNavigate = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header active={active} onNavigate={handleNavigate} />
      <main>
        <Home onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Dhruvi Kamani. Built with React, Express &amp; MongoDB.</p>
      </footer>
    </>
  );
}
