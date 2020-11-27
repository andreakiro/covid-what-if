import { policyFromList } from "./util";

function singleCycle(val) {
  return (val + 1) % 4;
}

export function cycle(level, i) {
  return level.map((val, index) => (index === i ? singleCycle(val) : val));
}

export function updateBox(state, policies, workingpol) {
  let order = workingpol[0];
  let newHeight = workingpol[1];
  return {
    width: state.box.width,
    height: newHeight,
    level: levelFromPolicies(policies, state.box.width, order),
  };
}

function levelFromPolicies(policies, width, order) {
  let newLevel = [];
  let pols = Object.values(policies);
  for (let i = 0; i < pols.length; i++) {
    if (order[i] === 0) continue;
    let pol = pols[i];
    let batch = Math.floor(pol.length / width);
    for (let j = 0; j < pol.length - batch + 1; j += batch) {
      let index = j / batch;
      let mean = compute(pol, index * batch, batch);
      newLevel.push(mean);
    }
  }
  return newLevel;
}

export function policiesFromLevel(range, width, order, level) {
  // range = day between()
  let policies = [];
  let span = Math.floor(range / width);
  for (let i = 0; i < 8; i++) {
    let pol = [];
    if (order[i] === 0) for (let j = 0; j < range; j++) pol.push(0);
    else {
      let index = 0;
      let k = 0;
      for (let j = 0; j < range; j++) {
        index += 1;
        pol.push(level[k]);
        if (index === span) {
          index = 0;
          if (k < level.length - 1) k++; // not very good yet though......
        }
      }
    }
    policies.push(pol);
  }
  return policyFromList(policies);
}

function compute(array, initIndex, batch) {
  let mean = 0;
  for (let i = 0; i < batch; i++) mean += array[initIndex + i];
  return Math.round(mean / batch);
}
