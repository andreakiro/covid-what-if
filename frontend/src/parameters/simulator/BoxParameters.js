import { useState } from "react";

function singleCycle(val) {
  return (val + 1) % 4;
}

function initialize(height) {
  return Array(height << 3).fill(0);
}

export function BoxParameters() {
  let [height, ] = useState(2);
  let [level, setLevel] = useState(initialize(height));

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
    values: {
      height,
      level,
    },
    functions: {
      cycle,
      reset,
      increase,
    },
  };

  return boxParams;
}
