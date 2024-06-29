import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>DrumPad</h1>
      <div className="logos">
        <a
          href="https://github.com/GiovanniRaniolo/Jitzu-Drum-Pad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.png" alt="GitHub" />
        </a>
        <div className="open-source">
          <p>open-source App in React</p>
        </div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src="/react.png" alt="React" />
        </a>
      </div>
    </header>
  );
};

export default Header;
