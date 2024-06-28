import React, { useRef } from "react";
import PropTypes from "prop-types";

const DrumPad = ({ text, src, volume, updateDisplayText }) => {
  const [isActive, setIsActive] = React.useState(false);
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

  const handleMouseDown = () => {
    setIsActive(true);
    play();
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const onKeyPress = (event) => {
    if (event.key.toUpperCase() === text.toUpperCase()) {
      setIsActive(true);
      play();
      setTimeout(() => {
        setIsActive(false);
      }, 100); // Timeout per simularne l'effetto di release
    }
  };

  React.useEffect(() => {
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
