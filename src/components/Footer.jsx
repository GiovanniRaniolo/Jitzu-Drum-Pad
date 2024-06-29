import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="logos">
        <a
          href="https://github.com/GiovanniRaniolo/Jitzu-Drum-Pad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.png" alt="GitHub" />
        </a>
        <div className="open-source">
          <p>OPEN-SOURCE APP IN REACT</p>
        </div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src="/react.png" alt="React" />
        </a>
      </div>
      <div className="footer">
        made with{" "}
        <span role="img" aria-label="heart emoji">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://linktr.ee/Jitzu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jitzu
        </a>
      </div>
    </div>
  );
};

export default Footer;
