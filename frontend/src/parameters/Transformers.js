import { daysBetween, minus } from "../utilities/DateComparator";
import {
  cycle,
  decrease,
  increase,
  reset,
  updateBox,
  updatePolicies,
  updatePolicies2,
} from "./BoxReducer";
import { policyFromList, workingPolicies } from "./Util";

export function initSession(state, action) {
  return {
    ...state,
    uid: action.uid,
    country: action.default === undefined ? null : action.default,
    countries: action.countries,
    policynames: action.policynames,
  };
}

export function setCountry(state, action) {
  return {
    ...state,
    country: action.country,
  };
}

export function setFrame(state, action) {
  let from = action.subject === "from" ? action.value : state.tframe.from;
  let until = action.subject === "until" ? action.value : state.tframe.until;
  let range = minus(from, until);
  return {
    ...state,
    tframe: {
      from: from,
      until: until,
      range: range,
    },
    trigger: range !== null ? 2 : 0,
  };
}

export function setup(state, action) {
  return {
    ...state,
    pinned: true,
    policies: action.policies, // still need to crop the policies [from, until]
    box: updateBox(state, action.policies, workingPolicies(action.policies)),
    order: workingPolicies(action.policies)[0],
  };
}

export function transform(state, action) {
  let level = [];
  if (action.card === "cycle") level = cycle(state.box.level, action.i);
  else if (action.card === "increase")
    level = increase(state.box.level, state.box.width, action.row);
  else if (action.card === "decrease")
    level = decrease(state.box.level, state.box.width, action.row);
  else if (action.card === "reset")
    level = reset(state.box.level, state.box.width, action.row);

  let interval = daysBetween(state.tframe.from, state.tframe.until);
  let range = interval === null ? 245 : interval;

  let policies =
    action.card === "cycle"
      ? updatePolicies(
          state.policies,
          range,
          state.box.width,
          state.order,
          level,
          action.i
        )
      : updatePolicies2(
          state.policies,
          range,
          state.box.width,
          state.order,
          level,
          action.row
        );

  return {
    ...state,
    policies: policies,
    trigger: 1,
    box: {
      height: state.box.height,
      width: state.box.width,
      level: level,
    },
  };
}

export function mutateMore(state, action) {
  let newLevel = [];
  let newOrder = [];
  let oldHeight = state.box.height;
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

export function mutateLess(state, action) {
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
