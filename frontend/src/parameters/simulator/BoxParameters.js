import { useState } from "react";

function singleCycle(val) {
  return (val + 1) % 4;
}

function initialize(height) {
  return Array(height << 3).fill(0);
}

export function BoxParameters() {
  let [height, setHeight] = useState(2);
  let [level, setLevel] = useState(initialize(height));

  // useEffect(() => setLevel(initialize(height)), [height, setLevel]);

  let cycle = (i) => {
    setLevel((level) =>
      level.map((val, index) => (index === i ? singleCycle(val) : val))
    );
  };

  let reset = () => {
    setLevel(initialize(height));
  };

  let increase = (row) => {
    setLevel((level) =>
      level.map((val, index) =>
        (row - 1) * 8 <= index && index < row * 8 ? singleCycle(val) : val
      )
    );
  };

  let boxParams = {
    height,
    level,
    cycle,
    reset,
    increase,
  };

  return boxParams;
}
