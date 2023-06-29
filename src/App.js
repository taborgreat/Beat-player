import { useReducer } from "react";
import "./App.css";

const initialState = {
  drumTypes: [
    {
      type: "kick",
      source: new Audio(require("./kick.mp3").default),
    },
    {
      type: "snare",
      source: new Audio(require("./clap.mp3").default),
    },
  ]
};

function App() {
  const reducer = () => {};

  const [state, dispatch] = useReducer(reducer, initialState);

  const drumList = state.drumTypes.map((drum) => (
    <button key={drum.type} onClick={() => drum.source.play()}>
      {drum.type}
    </button>
  ));

  return (
    <div id="drum-machine">
      <h1>beat player</h1>

      <div id="melody"></div>

      <div id="drums">{drumList}</div>
      <div id="display"></div>
    </div>
  );
}

export default App;
