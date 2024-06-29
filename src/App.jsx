import { useState } from "react";
import "./App.css";
import DrumMachine from "./components/DrumApp";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Header />
        <DrumMachine />
        <Footer />
      </div>
    </>
  );
}

export default App;
