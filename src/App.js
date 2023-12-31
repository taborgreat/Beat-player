import { useEffect, useReducer } from "react";
import "./App.css";
import { reducer } from "./reduce";
import {actions} from "./actions"



function App() {
  const initialState = {
    drums: [
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
    melodies: [
      {
        isPaused: false,
        name: "Horse Training Theme",
        source: require("./sounds/melodyone.mp3"),
      },
      {
        isPaused: false,
        name: "Spacey Industrial",
        source: require("./sounds/melodytwo.mp3"),
      },
      {
        isPaused: false,
        name: "Ghost of Myself",
        source: require("./sounds/melodythree.mp3"),
      },
    ],
    currentSong: 0,
    maxSongs: 2, //set based off of max songs
    playPauseImage: require("./images/play.png"),
  };

 
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      let currSound = state.drums.filter((drum) => drum.key === event.key);
      currSound.map((sound) => {
        sound.source.currentTime = 0;
        sound.source.play();

        return undefined;
      });
    });
  });

  const drumList = state.drums.map((drum) => (
    <button
      type="button"
      id={drum.type}
      key={drum.type}
      onClick={() => {
        drum.source.pause();
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
      <h1><u>BEAT PLAYER</u></h1>
      <div id="melody">
        <h2>{state.melodies[state.currentSong].name}</h2>
        <button
          id="prev"
          onClick={(e) => {
            e.preventDefault()
            dispatch({ type: actions.TOGGLESONG, move: actions.PREVSONG })}
          }
        >
          <img src={require("./images/leftarrow.png")} alt="PREV" />
        </button>

        <audio
          id="currSong"
          loop
          src={state.melodies[state.currentSong].source}
        ></audio>
        <button
          id="setPaused"
          onClick={() =>
            dispatch({
              type: actions.TOGGLEPAUSE,
              songRef: document.getElementById("currSong"),
            })
          }
        >
          <img src={state.playPauseImage} alt="PLAY" />
        </button>

        <button
          id="next"
          onClick={() =>
            dispatch({ type: actions.TOGGLESONG, move: actions.NEXTSONG })
          }
        >
          <img src={require("./images/rightarrow.png")} alt="NEXT" />
        </button>
      </div>

      <div id="drums">{drumList}</div>
      <div id="display"></div>
    </div>
  );
}

export default App;
