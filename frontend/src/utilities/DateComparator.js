export function untilIsBeforeFrom(from, until) {
  if (from === null || until === null) return false;
  console.log('here from', from, 'until', until);
  let dayFrom = parseInt(from.substring(0, 2));
  let monthFrom = parseInt(from.substring(3, 5));
  let yearFrom = parseInt(from.substring(6, 10));
  let dayUntil = parseInt(until.substring(0, 2));
  let monthUntil = parseInt(until.substring(3, 5));
  let yearUntil = parseInt(until.substring(6, 10));
  if (yearUntil < yearFrom) return true;
  else {
    if (monthUntil < monthFrom) return true;
    else if (dayUntil <= dayFrom) return true;
  }
  return false;
}

export function minus(from, until) {
  if (from === null && until === null) {
    return 32;
  } else {
    return 160;
  }
}