import { useState } from "react";

function singleCycle(val) {
  return (val + 1) % 4;
}

export function initialize(height, width) {
  return Array(height << 3).fill(0);
}

export function BoxParameters() {
  let [height, setHeight] = useState(2);
  let [width, setWidth] = useState(8);
  let [level, setLevel] = useState(initialize(height, width));

  let cycle = (i) => {
    setLevel((level) =>
      level.map((val, index) => (index === i ? singleCycle(val) : val))
    );
  };

  let reset = () => {
    setLevel(initialize(height, width));
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
      width,
      level,
    },
    functions: {
      cycle,
      reset,
      increase,
      setHeight,
      setWidth
    },
  };
  
  return boxParams;
}
