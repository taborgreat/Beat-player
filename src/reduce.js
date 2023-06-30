import {actions} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
      case actions.TOGGLESONG: {
        state.playPauseImage = require('./images/play.png')

        if (
          state.currentSong < state.maxSongs &&
          action.move === actions.NEXTSONG
        ) {
          return { ...state, currentSong: state.currentSong + 1 };
        } else if (
          state.currentSong >= state.maxSongs &&
          action.move === actions.NEXTSONG
        ) {
          return { ...state, currentSong: 0 };
        } else if (state.currentSong > 0 && action.move === actions.PREVSONG) {
          return { ...state, currentSong: state.currentSong - 1 };
        } else {
          return { ...state, currentSong: state.maxSongs };
        }
      }

      case actions.TOGGLEPAUSE: {
        if (!state.melodies[state.currentSong].isPaused) {
          action.songRef.play();
          return {
            ...state,
            playPauseImage: require("./images/pause.png"),
            melodies: state.melodies.map((melody, index) =>
              index === state.currentSong
                ? { ...melody, isPaused: !melody.isPaused }
                : melody
            ),
          };
        } else {
          action.songRef.pause();
          return {
            ...state,
            playPauseImage: require("./images/play.png"),
            melodies: state.melodies.map((melody, index) =>
              index === state.currentSong
                ? { ...melody, isPaused: !melody.isPaused }
                : melody
            ),
          };
        }
      }

      default:
        return state;
    }
  };
