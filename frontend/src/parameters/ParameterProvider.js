import React, { createContext, useContext } from "react";
import { BoxParameters } from "./simulator/BoxParameters";
import { InputsParameters } from "./simulator/InputsParameters";

const Context = createContext(null);

export function useParameters() {
  return useContext(Context);
}

export function getParameters() {
  let boxParams = BoxParameters();
  let inputsParams = InputsParameters();

  let parameters = {
    values: {
      ...boxParams.values,
      ...inputsParams.values,
    },
    functions: {
      ...boxParams.functions,
      ...inputsParams.functions,
    },
  };

  return parameters;
}

export default function ParameterProvider(props) {
  let boxParams = BoxParameters();
  let inputsParams = InputsParameters();

  let parameters = {
    values: {
      ...boxParams.values,
      ...inputsParams.values,
    },
    functions: {
      ...boxParams.functions,
      ...inputsParams.functions,
    },
  };

  return (
    <Context.Provider value={parameters}>{props.children}</Context.Provider>
  );
}
