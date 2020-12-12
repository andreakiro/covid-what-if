import { daysBetween, minus } from "../utilities/DateComparator";
import {
  cycle,
  increase,
  reset,
  updateBox,
  updatePolicies,
  updatePolicies2,
} from "./BoxReducer";
import { policyFromList, workingPolicies } from "./util";

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

    case "inc": {
      let newLevel = increase(state.box.level, state.box.width, action.row);

      let days = daysBetween(state.tframe.from, state.tframe.until);
      let range = days === null ? 245 : days;

      let newPolicies = updatePolicies2(
        state.policies,
        range,
        state.box.width,
        state.order,
        newLevel,
        action.row
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

    case "reset": {
      let newLevel = reset(state.box.level, state.box.width, action.row);

      let days = daysBetween(state.tframe.from, state.tframe.until);
      let range = days === null ? 245 : days;

      let newPolicies = updatePolicies2(
        state.policies,
        range,
        state.box.width,
        state.order,
        newLevel,
        action.row
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

    case "cycle": {
      let newLevel = cycle(state.box.level, action.i);

      let days = daysBetween(state.tframe.from, state.tframe.until);
      let range = days === null ? 245 : days;

      let newPolicies = updatePolicies(
        state.policies,
        range,
        state.box.width,
        state.order,
        newLevel,
        action.i
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
      // kind of init after load
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
        order: workingPolicies(action.policies)[0],
      };
    }

    case "crop": {
      return state;
    }

    case "del": {
      let newOrder = [];
      for (let i = 0; i < 8; i++) {
        if (i === action.index) newOrder[i] = action.status;
        else newOrder[i] = state.order[i];
      }

      let oldHeight = state.box.height;
      let newLevel = [];
      for (let i = 0; i < state.box.level.length; i++) {
        if (Math.floor(i / state.box.width) === action.relative) continue;
        newLevel.push(state.box.level[i]);
      }

      let oldPolicies = Object.values(state.policies);
      let pol = [];
      for (let i = 0; i < oldPolicies[0].length; i++) pol.push(0);
      let newPolicies = [];
      for (let i = 0; i < 8; i++) {
        if (action.index === i) newPolicies.push(pol);
        else newPolicies.push(oldPolicies[i]);
      }

      return {
        ...state,
        order: newOrder,
        policies: policyFromList(newPolicies),
        box: {
          width: state.box.width,
          height: oldHeight - 1,
          level: newLevel,
        },
        trigger: 1,
      };
    }

    case "add": {
      let newLevel = [];
      let newOrder = [];
      let oldHeight = state.box.height;
      console.log(action.relative);
      for (let i = 0; i < 8; i++) {
        if (i === action.relative) newOrder[i] = 1;
        else newOrder[i] = state.order[i];
      }

      let delay = 0;
      for (let i = 0; i < state.box.level.length + state.box.width; i++) {
        if (Math.floor(i / state.box.width) === action.relative) {
          newLevel.push(0);
          delay = 1;
        } else newLevel.push(state.box.level[i - state.box.width * delay]);
      }

      return {
        ...state,
        order: newOrder,
        box: {
          width: state.box.width,
          height: oldHeight + 1,
          level: newLevel,
        },
      };
    }

    case "unactives": {
      return {
        ...state,
        unactives: action.content,
      };
    }

    case "resettrigger": {
      return {
        ...state,
        trigger: 0,
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
