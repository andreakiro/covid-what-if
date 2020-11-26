import { minus } from "../utilities/DateComparator";

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
