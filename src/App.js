import { useEffect, useReducer } from "react";
import "./App.css";

function App() {
  const initialState = {
    drumTypes: [
      {
        type: "kick",
        source: new Audio(require("./sounds/kick.mp3")),
        key: "q",
        img: require("./images/kick.png"),
      },
      {
        type: "clap",
        source: new Audio(require("./sounds/clap.mp3")),
        key: "w",
        img: require("./images/clap.png"),
      },
      {
        type: "hi-hat",
        source: new Audio(require("./sounds/hihat.mp3")),
        key: "e",
        img: require("./images/hihat.png"),
      },
      {
        type: "openhat",
        source: new Audio(require("./sounds/openhat.mp3")),
        key: "r",
        img: require("./images/openhat.png"),
      },
    ],
  };

  const reducer = () => {};

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      let currSound = state.drumTypes.filter((drum) => drum.key === event.key);
      currSound.map((sound) => {
        sound.source.currentTime = 0;
        sound.source.play();
        return null;
      });
    });
  });

  const drumList = state.drumTypes.map((drum) => (
    <button
      key={drum.type}
      onClick={() => {
        drum.source.currentTime = 0;
        drum.source.play();
      }}
    >
      <img src={drum.img} alt={drum.type}></img>
      <p>{drum.key}</p>
    </button>
  ));

  return (
    <div id="drum-machine">
      <div id="melody"></div>

      <div id="drums">{drumList}</div>
      <div id="display"></div>
    </div>
  );
}

export default App;
