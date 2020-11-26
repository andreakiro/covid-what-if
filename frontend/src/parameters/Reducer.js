export function reducer(state, action) {
  switch (action.type) {
    case "initsession": {
      return {
        ...state,
        uid: action.uid,
        pinned: true,
        // country: "Switzerland",
        countries: action.countries,
      };
    }

    case "setcountry": {
      return {
        ...state,
        country: action.country,
      };
    }

    case "setfrom": {
      return {
        ...state,
        tframe: {
          from: action.from,
          until: state.tframe.until,
        },
      };
    }

    case "setuntil": {
      return {
        ...state,
        tframe: {
          from: state.tframe.from,
          until: action.until,
        },
      };
    }

    case "setheight": {
      let newLevel = [];
      for (let i = 0; i < state.level.length; i++)
        newLevel.push(state.level[i]);
      for (let i = 0; i < state.level.width; i++) newLevel.push(0);
      return {
        ...state,
        box: {
          height: state.box.height,
          width: action.height,
          level: newLevel,
        },
      };
    }

    case "cycle": {
      let newLevel = cycle(state.box.level, action.i);
      return {
        ...state,
        box: {
          height: state.box.height,
          width: state.box.width,
          level: newLevel,
        },
      };
    }

    case "log": {
      console.log(state);
      return state;
    }

    default:
      return state;
  }
}

function singleCycle(val) {
  return (val + 1) % 4;
}

function cycle(level, i) {
  return level.map((val, index) => (index === i ? singleCycle(val) : val));
}
