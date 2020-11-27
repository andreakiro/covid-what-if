export function untilIsBeforeFrom(from, until) {
  if (from === null || until === null) return false;
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

function date(strdate) {
  return new Date(
    strdate.substring(6, 10),
    strdate.substring(3, 5),
    strdate.substring(0, 2)
  );
}

export function daysBetween(from, until) {
  return minus(from, until);
}

export function minus(from, until) {
  if (from === null || until === null) return null;
  let d1 = date(from);
  let d2 = date(until);
  return (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
}
