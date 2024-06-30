import React, { useState, useEffect, useRef } from "react";
import DrumPad from "./DrumPad";
import "../App.css";

const bankOne = [
  { keyCode: 52, keyTrigger: "4", id: "stab-1", url: "/samples/stab-1.mp3" },
  { keyCode: 53, keyTrigger: "5", id: "stab-2", url: "/samples/stab-2.mp3" },
  { keyCode: 54, keyTrigger: "6", id: "stab-3", url: "/samples/stab-3.mp3" },
  { keyCode: 55, keyTrigger: "7", id: "noise", url: "/samples/noise.mp3" },
  { keyCode: 69, keyTrigger: "E", id: "hat-2", url: "/samples/hat-2.mp3" },
  { keyCode: 82, keyTrigger: "R", id: "kick-1", url: "/samples/kick-1.mp3" },
  { keyCode: 89, keyTrigger: "Y", id: "kick-2", url: "/samples/kick-2.mp3" },
  { keyCode: 85, keyTrigger: "U", id: "hat-1", url: "/samples/hat-1.mp3" },
  { keyCode: 68, keyTrigger: "D", id: "snare-1", url: "/samples/snare-1.mp3" },
  {
    keyCode: 70,
    keyTrigger: "F",
    id: "tambourine",
    url: "/samples/tambourine.mp3",
  },
  {
    keyCode: 71,
    keyTrigger: "G",
    id: "shaker-1",
    url: "/samples/shaker-1.mp3",
  },
  { keyCode: 72, keyTrigger: "H", id: "snare-2", url: "/samples/snare-2.mp3" },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "shaker-2",
    url: "/samples/shaker-2.mp3",
  },
  { keyCode: 67, keyTrigger: "C", id: "rim", url: "/samples/rim.mp3" },
  { keyCode: 66, keyTrigger: "B", id: "bongo-2", url: "/samples/bongo-2.mp3" },
  { keyCode: 78, keyTrigger: "N", id: "crash", url: "/samples/crash.mp3" },
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
    const displayVolumeValueElm = displayVolumeValue.current;

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
          <i className="" ref={iconVolume}></i>
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
