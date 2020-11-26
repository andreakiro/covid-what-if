import { minus } from "../utilities/DateComparator";

function cropArray(array, from, until) {
  return array;
}

export function crop(policies, from, until) {
  return {
    c1_level: cropArray(policies.c1_level, from, until),
    c2_level: cropArray(policies.c2_level, from, until),
    c3_level: cropArray(policies.c3_level, from, until),
    c4_level: cropArray(policies.c4_level, from, until),
    c5_level: cropArray(policies.c5_level, from, until),
    c6_level: cropArray(policies.c6_level, from, until),
    c7_level: cropArray(policies.c7_level, from, until),
    c8_level: cropArray(policies.c8_level, from, until),
  };
}

export function workingPolicies(body) {
  let beta = 0;
  let usage = [];
  let policies = Object.values(body);
  for (let i = 0; i < policies.length - 1; i++) {
    // -1 to remove useless h1 policy
    let bool = false;
    let pol = policies[i];
    for (let j = 0; j < pol.length; j++) {
      if (pol[j] !== 0) {
        beta++;
        bool = true;
        break;
      }
    }
    bool ? usage.push(1) : usage.push(0);
  }

  return [usage, beta];
}

export function policyFromList(policies) {
  return policies === null
    ? {
        c1_level: [],
        c2_level: [],
        c3_level: [],
        c4_level: [],
        c5_level: [],
        c6_level: [],
        c7_level: [],
        c8_level: [],
      }
    : {
        c1_level: policies[0],
        c2_level: policies[1],
        c3_level: policies[2],
        c4_level: policies[3],
        c5_level: policies[4],
        c6_level: policies[5],
        c7_level: policies[6],
        c8_level: policies[7],
      };
}

export function levelFromOrder(level, order, width) {
  // let policiesOrder = [1, 0, 1, 0, 1, 0, 1, 0]; not robust to order changes
  let newLevel = Array(8 * width).fill(0);
  let index = 0;
  for (let i = 0; i < order.length; i++) {
    if (order[i] === 0) continue;
    for (let j = 0; j < width; j++) newLevel[i * width + j] = level[index++];
  }
  return newLevel;
}

export function hey(setPolicies, level, width, height, from, until) {
  let range = minus(from, until);

  let policies2 = Array(height)
    .fill(0)
    .map(() => Array(range).fill(0));

  policies2.forEach((pts, index) => {
    let span = range / width;
    for (let i = 0; i < pts.length; i++) {
      if (index >= height) break;
      pts[i] = level[index * width + Math.floor(i / span)];
    }
  });

  let policies = [];
  let span = range / width;
  for (let i = 0; i < height; i++) {
    let pts = [];
    for (let j = 0; j < range; j++) {
      if (i >= height) break;
      pts.push(level[i * width + Math.floor(j / span)]);
    }
    policies.push(pts);
  }

  setPolicies(policyFromList(policies));
}
