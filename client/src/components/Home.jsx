import useTypedText from "../hooks/useTypedText";

const ROLES = ["Frontend Developer", "YouTuber", "Web Developer"];

export default function Home({ onNavigate }) {
  const typed = useTypedText(ROLES, { typeSpeed: 100, backSpeed: 60, backDelay: 1000 });

  return (
    <section id="home" className="home">
      <div className="home-content">
        <h3>Hello, It's Me</h3>
        <h1>Dhruvi Kamani</h1>
        <h3>
          And I'm a <span className="text">{typed}</span>
          <span className="typed-cursor">|</span>
        </h3>
        <p>
          I'm a web designer with extensive experience for over 3 years. My expertise is
          creating website design, frontend design, and much more.
        </p>

        <div className="home-sci">
          <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" aria-label="Instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" aria-label="WhatsApp"><i className="bx bxl-whatsapp"></i></a>
          <a href="#" aria-label="TikTok"><i className="bx bxl-tiktok"></i></a>
        </div>

        <button className="btn-box" onClick={() => onNavigate("about")}>
          More About Me
        </button>
      </div>
    </section>
  );
}
