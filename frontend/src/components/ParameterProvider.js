import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext(null);

function singleCycle(val) {
  return (val + 1) % 4;
}

function initialize(height) {
    return Array(height << 3).fill(0);
}

export function useParameters() {
  return useContext(Context);
}

export default function ParameterProvider(props) {
  let height = 5;
  let [level, setLevel] = useState(initialize(height));

  useEffect(() => setLevel(initialize(height)), [height, setLevel]);

  let cycle = (i) => {
   setLevel(level => level.map((val, index) => index === i ? singleCycle(val) : val))
  };

  let params = { height, level, cycle };

  return <Context.Provider value={params}>{props.children}</Context.Provider>;
}
