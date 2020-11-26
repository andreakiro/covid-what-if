import { minus } from "../utilities/DateComparator";
import { cycle, updateBox } from "./BoxReducer";
import { workingPolicies } from "./util";

export function reducer(state, action) {
  switch (action.type) {
    case "initsession": {
      return {
        ...state,
        uid: action.uid,
        pinned: true,
        country: action.default === undefined ? null : action.default,
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
          range: minus(action.from, state.tframe.until),
        },
      };
    }

    case "setuntil": {
      return {
        ...state,
        tframe: {
          from: state.tframe.from,
          until: action.until,
          range: minus(state.tframe.from, action.until),
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

    case "setpolicies": {
      // this function is called when a new policy set is received and we setLevel accordingly
      return {
        ...state,
        policies: action.policies, // still need to crop the policies [from, until]
        box: updateBox(
          state,
          action.policies,
          workingPolicies(action.policies)
        ),
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
