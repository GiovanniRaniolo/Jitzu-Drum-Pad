import React, { useState, useEffect, useRef } from "react";
import DrumPad from "./DrumPad";
import "../App.css";

const bankOne = [
  { keyCode: 81, keyTrigger: "Q", id: "", url: "/samples/808_Bass.wav" },
  { keyCode: 87, keyTrigger: "W", id: "", url: "/samples/Tom.wav" },
  { keyCode: 69, keyTrigger: "E", id: "", url: "/samples/Rim_9.wav" },
  { keyCode: 82, keyTrigger: "R", id: "", url: "/samples/Rim_8.wav" },
  { keyCode: 65, keyTrigger: "A", id: "", url: "/samples/Kick_1.wav" },
  { keyCode: 83, keyTrigger: "S", id: "", url: "/samples/Rim_6.wav" },
  { keyCode: 68, keyTrigger: "D", id: "", url: "/samples/Snare_02.wav" },
  { keyCode: 70, keyTrigger: "F", id: "", url: "/samples/Kick_5.wav" },
  { keyCode: 90, keyTrigger: "Z", id: "", url: "/samples/Hat_2.wav" },
  { keyCode: 88, keyTrigger: "X", id: "", url: "/samples/Hat_5.wav" },
  { keyCode: 67, keyTrigger: "C", id: "", url: "/samples/Hat_6.wav" },
  { keyCode: 86, keyTrigger: "V", id: "", url: "/samples/Rim_2.wav" },
  { keyCode: 66, keyTrigger: "B", id: "", url: "/samples/Rim_3.wav" },
  { keyCode: 78, keyTrigger: "N", id: "", url: "/samples/Shaker_5.wav" },
  { keyCode: 77, keyTrigger: "M", id: "", url: "/samples/Sharp_Bass.wav" },
  { keyCode: 76, keyTrigger: "L", id: "", url: "/samples/Vocoder_Fx.wav" },
];
const DrumMachine = ({ displayTextDefault = "Jitzu Drum Pad App" }) => {
  const volumeHandler = useRef(null);
  const iconVolume = useRef(null);
  const displayVolumeValue = useRef(null);

  const [volumeValue, setVolumeValue] = useState(50);
  const [displayText, setDisplayText] = useState(displayTextDefault);

  const updateDisplayText = (text) => {
    setDisplayText(text);
  };

  const onVolumeChanged = (event) => {
    const value = Number.parseInt(event.target.value, 10);
    const iconVolumeElm = iconVolume.current;
    const displayVolumeValueElm = displayVolumeValue.current;

    if (value === 0) iconVolumeElm.className = "fas fa-volume-off";
    else if (value < 50) iconVolumeElm.className = "fas fa-volume-down";
    else iconVolumeElm.className = "fas fa-volume-up";

    displayVolumeValueElm.style.setProperty("opacity", 1);
    setTimeout(() => {
      displayVolumeValueElm.style.setProperty("opacity", 0);
    }, 1000);

    setVolumeValue(value);
  };

  const onMouseLeaveInput = () => {
    setTimeout(() => {
      displayVolumeValue.current.style.setProperty("opacity", 0);
    }, 1000);
  };

  return (
    <div className="drum" id="drum-machine">
      <div className="drum-display" id="display">
        <h1>{displayText}</h1>
      </div>

      <div className="drum-control">
        <div className="drum-control-volumn">
          <i className="fas fa-volume-down" ref={iconVolume}></i>
          <span> volume</span>
          <span className="drum-control-volumn-value" ref={displayVolumeValue}>
            {volumeValue}
          </span>
          <input
            type="range"
            ref={volumeHandler}
            onChange={onVolumeChanged}
            onMouseLeave={onMouseLeaveInput}
            defaultValue={volumeValue}
          />
        </div>
      </div>

      <div className="drum-pads">
        {bankOne.map((item, index) => (
          <DrumPad
            text={item.keyTrigger}
            src={item.url}
            key={item.id || index}
            volume={volumeValue}
            updateDisplayText={updateDisplayText}
          />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
