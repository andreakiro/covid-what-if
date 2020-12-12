import { daysBetween, minus } from "../utilities/DateComparator";
import { cycle, policiesFromLevel, updateBox } from "./BoxReducer";
import { workingPolicies } from "./util";

export function reducer(state, action) {
  switch (action.type) {
    case "initsession": {
      return {
        ...state,
        uid: action.uid,
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
        trigger: newRange !== null ? 2 : 0,
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
        trigger: newRange !== null ? 2 : 0,
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

      let days = daysBetween(state.tframe.from, state.tframe.until);
      let range = days === null ? 245 : days;

      let newPolicies = policiesFromLevel(
        range,
        state.box.width,
        workingPolicies(state.policies)[0],
        newLevel
      );

      return {
        ...state,
        box: {
          height: state.box.height,
          width: state.box.width,
          level: newLevel,
        },
        policies: newPolicies,
        trigger: 1,
      };
    }

    case "setpolicies": {
      // this function is called when a new policy set is received and we setLevel accordingly
      return {
        ...state,
        pinned: true,
        policies: action.policies, // still need to crop the policies [from, until]
        box: updateBox(
          state,
          action.policies,
          workingPolicies(action.policies)
        ),
      };
    }

    case "crop": {
      return state;
    }

    case "resettrigger": {
      return {
        ...state,
        trigger: 0,
      };
    }

    case "log": {
      console.log(JSON.stringify(state.policies));
      return state;
    }

    default:
      return state;
  }
}
