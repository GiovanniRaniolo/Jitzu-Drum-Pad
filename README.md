# Jitzu Drum Pad

Jitzu Drum Pad App is a web application in React that allows you to play samples using your computer keyboard or by tapping on the screen.

![Screenshot of the application](./public/screenshoot.png)

##### Key Features

- **Keyboard Trigger**: Play drum pads using corresponding keyboard keys.
- **Volume Control**: Adjust the volume with a simple slider.
- **Intuitive Interface**: Easy-to-use interface suitable for both desktop and mobile devices.

##### How to Use

1.  Go to this link: https://jitzu-drum-pad.vercel.app
2.  The main screen displays all available drum pads.
3.  Use the corresponding keyboard keys to trigger drum sounds.
4.  Slide the volume control to adjust the sound intensity.
5.  **Mobile Interaction**: Tap the drum pads on the screen to play sounds.

## Table of Contents

- [Jitzu Drum Pad](#jitzu-drum-pad)
  - [Table of Contents](#table-of-contents)
  - [Application Link](#application-link)
  - [Usage Instructions](#usage-instructions)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [Deployment](#deployment)
  - [Project Structure](#project-structure)
  - [Components](#components)
    - [DrumMachine Component](#drummachine-component)
      - [useState Hook](#usestate-hook)
      - [useRef Hook](#useref-hook)
      - [updateDisplayText Function](#updatedisplaytext-function)
      - [onVolumeChanged Function](#onvolumechanged-function)
    - [DrumPad Component](#drumpad-component)
      - [useState Hook](#usestate-hook-1)
      - [useRef Hook](#useref-hook-1)
      - [play Function](#play-function)
      - [handleMouseDown Function](#handlemousedown-function)
      - [handleMouseUp Function](#handlemouseup-function)
      - [handleTouchStart Function](#handletouchstart-function)
      - [handleTouchEnd Function](#handletouchend-function)
      - [simulateRelease Function](#simulaterelease-function)
      - [onKeyPress Function](#onkeypress-function)
      - [useEffect Hook](#useeffect-hook)
      - [Return Statement](#return-statement)
    - [Footer Component](#footer-component)
    - [Header Component](#header-component)
  - [Development Environment](#development-environment)
  - [Conclusion](#conclusion)
  - [Future Improvements](#future-improvements)
  - [Contributing](#contributing)
  - [License](#license)

---

## Application Link

You can access and use the Jitzu DrumPad application by clicking [**HERE**](https://jitzu-drum-pad.vercel.app).

## Usage Instructions

### Installation

1.  **Clone the repository:**

```bash
git clone https://github.com/GiovanniRaniolo/Jitzu-Drum-Pad
```

2.  **Navigate into the project directory:**

```bash
    cd Jitzu-Drum-Pad
```

4.  **Install dependencies:**

    `npm install`

### Running the Application

1.  **Start the development server:**

    `npm start`

2.  **Open your browser and go to:**

    `http://localhost:3000`

### Deployment

Customize and deploy the application as needed.

---

## Project Structure

The project directory is organized as follows:

```css
Jitzu-Drum-Pad/
├── public/
│   ├── samples/
│   │   ├── stab-1.mp3
│   │   ├── stab-2.mp3
│   │   └── ...
│   ├── github.png
|   └── ...
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── DrumPad.jsx
│   │   ├── DrumMachine.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   └── ...
├── index.html
├── README.md
└── ...
```

## Components

### DrumMachine Component

The `DrumMachine.jsx` component manages the main structure of the application, rendering the header, drum machine interface, and footer.

```jsx
 1 | import React, { useState, useEffect, useRef } from "react";
 2 | import DrumPad from "./DrumPad";
 3 | import "../App.css";
 4 |
 5 | const bankOne = [
 6 |   { keyCode: 52, keyTrigger: "4", id: "stab-1", url: "/samples/stab-1.mp3" },
 7 |   { keyCode: 53, keyTrigger: "5", id: "stab-2", url: "/samples/stab-2.mp3" },
 8 |   { keyCode: 54, keyTrigger: "6", id: "stab-3", url: "/samples/stab-3.mp3" },
 9 |   { keyCode: 55, keyTrigger: "7", id: "noise", url: "/samples/noise.mp3" },
10 |   { keyCode: 69, keyTrigger: "E", id: "hat-2", url: "/samples/hat-2.mp3" },
11 |   { keyCode: 82, keyTrigger: "R", id: "kick-1", url: "/samples/kick-1.mp3" },
12 |   { keyCode: 89, keyTrigger: "Y", id: "kick-2", url: "/samples/kick-2.mp3" },
13 |   { keyCode: 85, keyTrigger: "U", id: "hat-1", url: "/samples/hat-1.mp3" },
14 |   { keyCode: 68, keyTrigger: "D", id: "snare-1", url: "/samples/snare-1.mp3" },
15 |   { keyCode: 70, keyTrigger: "F", id: "tambourine", url: "/samples/tambourine.mp3" },
16 |   { keyCode: 71, keyTrigger: "G", id: "shaker-1", url: "/samples/shaker-1.mp3" },
17 |   { keyCode: 72, keyTrigger: "H", id: "snare-2", url: "/samples/snare-2.mp3" },
18 |   { keyCode: 88, keyTrigger: "X", id: "shaker-2", url: "/samples/shaker-2.mp3" },
19 |   { keyCode: 67, keyTrigger: "C", id: "rim", url: "/samples/rim.mp3" },
20 |   { keyCode: 66, keyTrigger: "B", id: "bongo-2", url: "/samples/bongo-2.mp3" },
21 |   { keyCode: 78, keyTrigger: "N", id: "crash", url: "/samples/crash.mp3" },
22 | ];
23 |
24 | const DrumMachine = ({ displayTextDefault = "push some beat!" }) => {
25 |   const volumeHandler = useRef(null);
26 |   const iconVolume = useRef(null);
27 |   const displayVolumeValue = useRef(null);
28 |
29 |   const [volumeValue, setVolumeValue] = useState(50);
30 |   const [displayText, setDisplayText] = useState(displayTextDefault);
31 |
32 |   const updateDisplayText = (text) => {
33 |     setDisplayText(text);
34 |   };
35 |
36 |   const onVolumeChanged = (event) => {
37 |     const value = Number.parseInt(event.target.value, 10);
38 |     const displayVolumeValueElm = displayVolumeValue.current;
39 |
40 |     displayVolumeValueElm.style.setProperty("opacity", 1);
41 |     setTimeout(() => {
42 |       displayVolumeValueElm.style.setProperty("opacity", 0);
43 |     }, 1000);
44 |
45 |     setVolumeValue(value);
46 |   };
47 |
48 |   const onMouseLeaveInput = () => {
49 |     setTimeout(() => {
50 |       displayVolumeValue.current.style.setProperty("opacity", 0);
51 |     }, 1000);
52 |   };
53 |
54 |   return (
55 |     <div className="drum" id="drum-machine">
56 |       <div className="drum-display" id="display">
57 |         <h1>{displayText}</h1>
58 |       </div>
59 |
60 |       <div className="drum-control">
61 |         <div className="drum-control-volumn">
62 |           <i className="" ref={iconVolume}></i>
63 |           <span> volume</span>
64 |           <span className="drum-control-volumn-value" ref={displayVolumeValue}>
65 |             {volumeValue}
66 |           </span>
67 |           <input
68 |             type="range"
69 |             ref={volumeHandler}
70 |             onChange={onVolumeChanged}
71 |             onMouseLeave={onMouseLeaveInput}
72 |             defaultValue={volumeValue}
73 |           />
74 |         </div>
75 |       </div>
76 |
77 |       <div className="drum-pads">
78 |         {bankOne.map((item, index) => (
79 |           <DrumPad
80 |             text={item.keyTrigger}
81 |             src={item.url}
82 |             key={item.id || index}
83 |             volume={volumeValue}
84 |             updateDisplayText={updateDisplayText}
85 |           />
86 |         ))}
87 |       </div>
88 |     </div>
89 |   );
90 | };
91 |
92 | export default DrumMachine;
```

The `DrumMachine` component is designed to create a drum machine with various drum sounds and a volume control.

#### Import Statements

The code imports necessary React hooks (`useState`, `useEffect`, `useRef`) and the `DrumPad` component from the `./DrumPad` file. It also imports the CSS file `../App.css`.

```jsx
import React, { useState, useEffect, useRef } from "react";
import DrumPad from "./DrumPad";
import "../App.css";
```

#### `bankOne` Constant

This is an array of objects representing different drum sounds. Each object has properties like `keyCode`, `keyTrigger`, `id`, `url`, which correspond to the key code, key trigger, unique identifier, and audio file URL of the drum sound, respectively.

```jsx
`const bankOne = [
  { keyCode: 52, keyTrigger: "4", id: "stab-1", url: "/samples/stab-1.mp3" },
  { keyCode: 53, keyTrigger: "5", id: "stab-2", url: "/samples/stab-2.mp3" },
  { keyCode: 54, keyTrigger: "6", id: "stab-3", url: "/samples/stab-3.mp3" },
  { keyCode: 55, keyTrigger: "7", id: "noise", url: "/samples/noise.mp3" },
  { keyCode: 69, keyTrigger: "E", id: "hat-2", url: "/samples/hat-2.mp3" },
  { keyCode: 82, keyTrigger: "R", id: "kick-1", url: "/samples/kick-1.mp3" },
  { keyCode: 89, keyTrigger: "Y", id: "kick-2", url: "/samples/kick-2.mp3" },
  { keyCode: 85, keyTrigger: "U", id: "hat-1", url: "/samples/hat-1.mp3" },
  { keyCode: 68, keyTrigger: "D", id: "snare-1", url: "/samples/snare-1.mp3" },
  { keyCode: 70, keyTrigger: "F", id: "tambourine", url: "/samples/tambourine.mp3" },
  { keyCode: 71, keyTrigger: "G", id: "shaker-1", url: "/samples/shaker-1.mp3" },
  { keyCode: 72, keyTrigger: "H", id: "snare-2", url: "/samples/snare-2.mp3" },
  { keyCode: 88, keyTrigger: "X", id: "shaker-2", url: "/samples/shaker-2.mp3" },
  { keyCode: 67, keyTrigger: "C", id: "rim", url: "/samples/rim.mp3" },
  { keyCode: 66, keyTrigger: "B", id: "bongo-2", url: "/samples/bongo-2.mp3" },
  { keyCode: 78, keyTrigger: "N", id: "crash", url: "/samples/crash.mp3" },
];
```

#### `DrumMachine` Component

This is the main component of the drum machine. It takes an optional prop `displayTextDefault` with a default value of "push some beat!".

```jsx
const DrumMachine = ({ displayTextDefault = "push some beat!" }) => {
```

#### `useState` Hook

The `useState` hook is used to manage the state of the `volumeValue` variable, initializing it to 50. It provides a function `setVolumeValue` to update its value based on user interaction with the volume slider.

```jsx
const [volumeValue, setVolumeValue] = useState(50);
const [displayText, setDisplayText] = useState(displayTextDefault);
```

#### `useRef` Hook

The `useRef` hook creates references (`volumeHandler`, `iconVolume`, `displayVolumeValue`) used for manipulating DOM elements related to volume control, such as the slider and display elements.

```jsx
const volumeHandler = useRef(null);
const iconVolume = useRef(null);
const displayVolumeValue = useRef(null);
```

#### `updateDisplayText` Function

The `updateDisplayText` function updates the display text in the drum machine interface based on user interactions with the drum pads, indicating which sound is being played.

```jsx
const updateDisplayText = (text) => {
  setDisplayText(text);
};
```

#### `onVolumeChanged` Function

The `onVolumeChanged` function is called when the user adjusts the volume slider. It updates the `volumeValue` state and adjusts the opacity of the volume display element to provide visual feedback.

```jsx
const onVolumeChanged = (event) => {
  const value = Number.parseInt(event.target.value, 10);
  const displayVolumeValueElm = displayVolumeValue.current;

  displayVolumeValueElm.style.setProperty("opacity", 1);
  setTimeout(() => {
    displayVolumeValueElm.style.setProperty("opacity", 0);
  }, 1000);

  setVolumeValue(value);
};
```

#### `onMouseLeaveInput` Function

The `onMouseLeaveInput` function hides the volume value display element after a delay when the mouse leaves the volume slider.

```jsx
const onMouseLeaveInput = () => {
  setTimeout(() => {
    displayVolumeValue.current.style.setProperty("opacity", 0);
  }, 1000);
};
```

#### Rendering

The component renders the drum machine interface, including the display, control panel, and drum pads. The drum pads are generated using the `map` function, passing the necessary props to the `DrumPad` component.

```jsx
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
```

#### `DrumPad` Component Integration

The `DrumMachine` component passes necessary props (`text`, `src`, `volume`, `updateDisplayText`) to each `DrumPad` component, ensuring each drum pad can trigger the appropriate sound and update the display text accordingly.

```jsx
<DrumPad
  text={item.keyTrigger}
  src={item.url}
  key={item.id || index}
  volume={volumeValue}
  updateDisplayText={updateDisplayText}
/>
```

Overall, the `DrumMachine` component creates a functional drum machine with various drum sounds and a volume control, providing an interactive experience for users to create beats.

### DrumPad Component

The `DrumPad.jsx` component represents an individual drum pad that users can interact with to trigger sounds.

```jsx
 1 | import React, { useRef, useState, useEffect, useCallback } from "react";
 2 | import PropTypes from "prop-types";
 3 | import "./DrumPad.css";
 4 |
 5 | const DrumPad = ({ text, src, volume, updateDisplayText }) => {
 6 |   const [isActive, setIsActive] = useState(false);
 7 |   const pad = useRef(null);
 8 |
 9 |   const play = () => {
10 |     const audio = pad.current.querySelector("audio");
11 |
12 |     audio.currentTime = 0;
13 |     audio.volume = volume / 100;
14 |     audio.play();
15 |
16 |     updateDisplayText(
17 |       src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
18 |     );
19 |   };
20 |
21 |   const handleMouseDown = (event) => {
22 |     event.preventDefault();
23 |     setIsActive(true);
24 |     play();
25 |     simulateRelease();
26 |   };
27 |
28 |   const handleMouseUp = (event) => {
29 |     event.preventDefault();
30 |     setIsActive(false);
31 |   };
32 |
33 |   const handleTouchStart = (event) => {
34 |     setIsActive(true);
35 |     play();
36 |     simulateRelease();
37 |   };
38 |
39 |   const handleTouchEnd = (event) => {
40 |     event.preventDefault();
41 |     setIsActive(false);
42 |   };
43 |
44 |   const simulateRelease = () => {
45 |     setTimeout(() => {
46 |       setIsActive(false);
47 |     }, 100); // Timeout per simulare l'effetto di rilascio
48 |   };
49 |
50 |   const onKeyPress = useCallback(
51 |     (event) => {
52 |       if (event.key.toUpperCase() === text.toUpperCase()) {
53 |         setIsActive(true);
54 |         play();
55 |         simulateRelease();
56 |       }
57 |     },
58 |     [text, play]
59 |   );
60 |
61 |   useEffect(() => {
62 |     document.addEventListener("keydown", onKeyPress);
63 |
64 |     return () => {
65 |       document.removeEventListener("keydown", onKeyPress);
66 |     };
67 |   }, [onKeyPress]);
68 |
69 |   return (
70 |     <div
71 |       className={`drum-pad ${isActive ? "active" : ""}`}
72 |       id={`drum-${text}`}
73 |       ref={pad}
74 |       onMouseDown={handleMouseDown}
75 |       onMouseUp={handleMouseUp}
76 |       onMouseLeave={handleMouseUp}
77 |       onTouchStart={handleTouchStart}
78 |       onTouchEnd={handleTouchEnd}
79 |     >
80 |       <audio className="clip" src={src} id={text}></audio>
81 |       {text}
82 |     </div>
83 |   );
84 | };
85 |
86 | DrumPad.propTypes = {
87 |   text: PropTypes.string.isRequired,
88 |   src: PropTypes.string.isRequired,
89 |   volume: PropTypes.number.isRequired,
90 |   updateDisplayText: PropTypes.func.isRequired,
91 | };
92 |
93 | export default DrumPad;
```

The `DrumPad` component takes four props: `text` (the label of the drum pad), `src` (the source URL of the audio clip), `volume` (the volume level of the audio clip), and `updateDisplayText` (a function to update the display text).

#### `useState` Hook

The `useState` hook in `DrumPad.jsx` manages the `isActive` state, indicating whether the drum pad is currently active (clicked or triggered).

```jsx
const [isActive, setIsActive] = useState(false);
```

This hook initializes the `isActive` state to `false` and provides a `setIsActive` function to update this state.

#### `useRef` Hook

The `useRef` hook creates a reference (`pad`) to the `div` element containing the drum pad, allowing direct manipulation of its properties.

```jsx
const pad = useRef(null);
```

This reference is used to access the audio element within the drum pad and manipulate its properties directly.

#### `play` Function

The `play` function initializes and plays the audio associated with the drum pad when clicked or triggered via keyboard shortcut.

```jsx
const play = () => {
  const audio = pad.current.querySelector("audio");

  audio.currentTime = 0;
  audio.volume = volume / 100;
  audio.play();

  updateDisplayText(
    src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
  );
};
```

This function:

- Resets the audio playback to the start (`audio.currentTime = 0`).
- Sets the audio volume based on the `volume` prop (`audio.volume = volume / 100`).
- Plays the audio (`audio.play()`).
- Updates the display text with the name of the sound being played (`updateDisplayText(...)`).

#### `handleMouseDown` Function

The `handleMouseDown` function sets `isActive` to true when the drum pad is clicked, plays the associated sound using the `play` function, and simulates a release effect with `simulateRelease`.

```jsx
const handleMouseDown = (event) => {
  event.preventDefault();
  setIsActive(true);
  play();
  simulateRelease();
};
```

#### `handleMouseUp` Function

The `handleMouseUp` function sets `isActive` to false when the mouse button is released, indicating the drum pad is no longer active.

```jsx
const handleMouseUp = (event) => {
  event.preventDefault();
  setIsActive(false);
};
```

#### `handleTouchStart` Function

The `handleTouchStart` function handles touch events on the drum pad, setting `isActive` to true, playing the sound, and simulating a release effect.

```jsx
const handleTouchStart = (event) => {
  setIsActive(true);
  play();
  simulateRelease();
};
```

#### `handleTouchEnd` Function

The `handleTouchEnd` function sets `isActive` to false when the touch ends, indicating the drum pad is no longer active.

```jsx
const handleTouchEnd = (event) => {
  event.preventDefault();
  setIsActive(false);
};
```

#### `simulateRelease` Function

The `simulateRelease` function uses `setTimeout` to set `isActive` to false after a brief timeout, simulating the effect of releasing the drum pad.

```jsx
const simulateRelease = () => {
  setTimeout(() => {
    setIsActive(false);
  }, 100); // Timeout to simulate the release effect
};
```

#### `onKeyPress` Function

The `onKeyPress` function is a callback triggered when a key corresponding to the drum pad's `text` prop is pressed. It sets `isActive` to true, plays the sound using the `play` function, and simulates a release effect.

```jsx
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
```

#### `useEffect` Hook

The `useEffect` hook in `DrumPad.jsx` adds and removes an event listener for keyboard presses when the component mounts and unmounts, respectively.

```jsx
useEffect(() => {
  document.addEventListener("keydown", onKeyPress);

  return () => {
    document.removeEventListener("keydown", onKeyPress);
  };
}, [onKeyPress]);
```

This hook ensures that the `onKeyPress` event listener is properly set up when the component is mounted and removed when it is unmounted, preventing memory leaks and ensuring proper functionality.

#### `Return` Statement

The `return` statement renders the drum pad `div`, applying styles based on `isActive`, and includes an `audio` element for sound playback.

```jsx
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
```

This JSX structure defines the drum pad's appearance and behavior:

- The `className` is conditionally set based on the `isActive` state.
- The `id` is set using the `text` prop.
- The `ref` is assigned to `pad` to allow direct manipulation.
- Event handlers are attached for mouse and touch events.
- The `audio` element is included for playing the sound associated with the drum pad.
- The `text` prop is displayed within the `div`.

## Development Environment

Jitzu Drum Pad was developed using [Vite](https://vitejs.dev), which provided a fast and efficient development experience with React. Vite's quick build times and modern JavaScript module handling contributed to the seamless creation and deployment of this application.

## Conclusion

Jitzu Drum Pad serves as an excellent exercise for practicing React programming, offering a hands-on approach to building interactive web applications. Developed during the Edgemony CB10 bootcamp (June 2024), this project showcases foundational React concepts such as state management, event handling, and component architecture.

## Future Improvements

Future iterations of Jitzu Drum Pad could explore additional features such as:

- **Low Latency Audio Playback**: Improve the audio playback latency by leveraging Web Audio API or specialized audio libraries such as Howler.js or Tone.js. These technologies can help achieve near-real-time audio playback, reducing delays between user input and sound output.

  - **Web Audio API**: Utilize the Web Audio API to create a more efficient audio processing pipeline. This can include:

    - **AudioContext** for managing the audio graph and handling audio nodes.
    - **Buffers** for efficient audio sample manipulation.
    - **Gain Nodes** for controlling the volume with precise gain adjustments.

  - **Howler.js**: Use Howler.js for simplified audio management, offering features like:

    - **Cross-browser compatibility** for consistent performance across different platforms.
    - **Audio sprite support** for managing multiple audio files more efficiently.

  - **Tone.js**: Implement Tone.js for more complex audio synthesis and effects. Features include:
    - **Synthesizers** for creating custom sounds.
    - **Effects chaining** for adding reverb, delay, and other audio effects.
    - **Sequencer** for programming complex drum patterns with ease.

- **Customizable Drum Kits**: Allow users to create and save their own drum kit configurations. This feature would enable users to personalize their drum sets, selecting different samples for each drum pad.

- **Recording and Playback**: Integrate functionality for recording drum patterns and playing them back.

- **Visual Effects**: Enhance the user interface with additional visual feedback for a more engaging experience. Ideas include better visual cues for active drum pads and dynamic backgrounds that react to the beat.

These enhancements will make Jitzu DrumPad not only a fun and educational tool but also a nice web platform for music and experimentation.

## Contributing

Contributions to Jitzu DrumPad are encouraged! Whether you're fixing bugs, improving functionality, or adding new features, your contributions help enhance this project. To contribute:

1.  Fork the repository and clone it locally.
2.  Create a new branch for your feature or bug fix.
3.  Commit changes and push to your branch.
4.  Submit a pull request detailing the changes made and why they are necessary.

Explore the code, experiment with modifications, and leverage Jitzu DrumPad to deepen your understanding of React development. Thank you for your interest and happy coding!

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as long as the original copyright notice and this permission notice are included in all copies or substantial portions of the software.
