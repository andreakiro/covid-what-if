import React, { createContext, useContext, useEffect } from "react";
import { BoxParameters } from "./simulator/BoxParameters";
import { GraphParameters } from "./simulator/GraphParameters";
import { InputsParameters } from "./simulator/InputsParameters";

const Context = createContext(null);

export function useParameters() {
  return useContext(Context);
}

export function getParameters() {
  let boxParams = BoxParameters();
  let inputsParams = InputsParameters();
  let graphParams = GraphParameters();

  let parameters = {
    boxParams,
    inputsParams,
    graphParams,
  };

  return parameters;
}

export default function ParameterProvider(props) {
  let parameters = getParameters();

  useEffect(() => parameters.graphParams.updateData(), [
    parameters.inputsParams.country,
    parameters.boxParams.level,
  ]);

  return (
    <Context.Provider value={parameters}>{props.children}</Context.Provider>
  );
}
