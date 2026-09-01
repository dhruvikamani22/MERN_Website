import { useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skill" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Header({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleClick = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="header">
      <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleClick("home"); }}>
        Portfolio
      </a>

      <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle navigation">
        <i className={`bx ${open ? "bx-x" : "bx-menu"}`}></i>
      </button>

      <nav className={`navbar ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
