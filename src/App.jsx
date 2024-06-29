import { useState } from "react";
import "./App.css";
import DrumMachine from "./components/DrumApp";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Header />
        <DrumMachine />
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
    </>
  );
}

export default App;
