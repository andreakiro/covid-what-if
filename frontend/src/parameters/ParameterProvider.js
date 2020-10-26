import React, { createContext, useContext, useState, useEffect } from "react";
import { BoxParameters } from "./BoxParameters";
import { GraphParameters } from "./GraphParameters";
import { InputsParameters } from "./InputsParameters";
import { send } from "../API";

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

  useEffect(() => parameters.graphParams.updateData(), [parameters.inputsParams.country, parameters.boxParams.level]);
  
  return (
    <Context.Provider value={parameters}>{props.children}</Context.Provider>
  );
}
