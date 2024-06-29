import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const DrumPad = ({ text, src, volume, updateDisplayText }) => {
  const [isActive, setIsActive] = useState(false);
  const pad = useRef(null);

  const play = () => {
    const audio = pad.current.querySelector("audio");

    audio.currentTime = 0;
    audio.volume = volume / 100;
    audio.play();

    updateDisplayText(
      src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
    );
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsActive(true);
    play();
    simulateRelease();
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    setIsActive(false);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    setIsActive(true);
    play();
    simulateRelease();
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    setIsActive(false);
  };

  const simulateRelease = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 100); // Timeout per simulare l'effetto di rilascio
  };

  const onKeyPress = useCallback(
    (event) => {
      if (event.key.toUpperCase() === text.toUpperCase()) {
        setIsActive(true);
        play();
        simulateRelease();
      }
    },
    [text, play]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <div
      className={`drum-pad ${isActive ? "active" : ""}`}
      id={`drum-${text}`}
      ref={pad}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <audio className="clip" src={src} id={text}></audio>
      {text}
    </div>
  );
};

DrumPad.propTypes = {
  text: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  updateDisplayText: PropTypes.func.isRequired,
};

export default DrumPad;
