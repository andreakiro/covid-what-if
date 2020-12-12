import { policyFromList } from "./util";

function singleCycle(val) {
  return (val + 1) % 4;
}

export function cycle(level, i) {
  return level.map((val, index) => (index === i ? singleCycle(val) : val));
}

export function reset(level, width, row) {
  return level.map((val, index) => Math.floor(index / width) === row ? 0 : val);
};

export function increase(level, width, row) {
  return level.map((val, index) => Math.floor(index / width) === row ? val + 1 : val);
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

export function updatePolicies(oldp, range, width, order, level, index) {
  let oldpolicies = Object.values(oldp);
  let policies = [];
  let span = Math.floor(range / width);
  let buff = 0;
  let array = Math.floor(index / width);
  let area = index % width;
  for (let i = 0; i < order.length; i++) {
    let pol = [];
    if (order[i] === 0) {
      for (let j = 0; j < range; j++) pol.push(oldpolicies[i][j]);
      buff++;
    } else {
      let curLevel = level.slice(
        i * order.length - buff * order.length,
        (i + 1) * order.length - buff * order.length
      );
      let levelIndex = 0;
      for (let j = 0; j < range; j++) {
        if (j !== 0 && j % span === 0 && levelIndex < order.length - 1)
          levelIndex++;
        let inarray = array === i - buff;
        let inarea = area === levelIndex;
        if (inarray && inarea) {
          pol.push(curLevel[levelIndex]);
        } else {
          pol.push(oldpolicies[i][j]);
        }
      }
    }
    policies.push(pol);
  }
  return policyFromList(policies);
}

export function updatePolicies2(oldp, range, width, order, level, row) {
  let oldpolicies = Object.values(oldp);
  let policies = [];
  let span = Math.floor(range / width);
  let buff = 0;
  for (let i = 0; i < order.length; i++) {
    let pol = [];
    if (order[i] === 0) {
      for (let j = 0; j < range; j++) pol.push(oldpolicies[i][j]);
      buff++;
    } else {
      let curLevel = level.slice(
        i * order.length - buff * order.length,
        (i + 1) * order.length - buff * order.length
      );
      let levelIndex = 0;
      for (let j = 0; j < range; j++) {
        if (j !== 0 && j % span === 0 && levelIndex < order.length - 1)
          levelIndex++;
        if (row === i - buff) {
          pol.push(curLevel[levelIndex]);
        } else {
          pol.push(oldpolicies[i][j]);
        }
      }
    }
    policies.push(pol);
  }
  return policyFromList(policies);
}

export function policiesFromLevel(range, width, order, level) {
  let policies = [];
  let span = Math.floor(range / width);
  let buff = 0;
  for (let i = 0; i < order.length; i++) {
    let pol = [];
    if (order[i] === 0) {
      for (let j = 0; j < range; j++) pol.push(0);
      buff++;
    } else {
      let curLevel = level.slice(
        i * order.length - buff * order.length,
        (i + 1) * order.length - buff * order.length
      );
      let levelIndex = 0;
      for (let j = 0; j < range; j++) {
        if (j !== 0 && j % span === 0 && levelIndex < order.length - 1)
          levelIndex++;
        pol.push(curLevel[levelIndex]);
      }
    }
    policies.push(pol);
  }
  return policyFromList(policies);
}

export function policiesFromLevel2(range, width, order, level, oldPolicies) {
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
