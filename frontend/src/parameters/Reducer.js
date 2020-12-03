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
        policynames: action.policynames,
      };
    }

    case "setcountry": {
      return {
        ...state,
        country: action.country,
      };
    }

    case "setfrom": {
      let newFrom = action.from;
      let newRange = minus(newFrom, state.tframe.until);
      return {
        ...state,
        tframe: {
          from: newFrom,
          until: state.tframe.until,
          range: newRange,
        },
        trigger: newRange !== null ? true : false,
      };
    }

    case "setuntil": {
      let newUntil = action.until;
      let newRange = minus(state.tframe.from, newUntil);
      return {
        ...state,
        tframe: {
          from: state.tframe.from,
          until: newUntil,
          range: newRange,
        },
        trigger: newRange !== null ? true : false,
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
        trigger: true,
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

    case "resettrigger": {
      console.log("HEY!");
      return {
        ...state,
        trigger: false,
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
