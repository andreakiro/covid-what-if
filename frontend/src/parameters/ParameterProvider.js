import React, { createContext, useContext, useState, useReducer } from "react";
import { BoxParameters } from "./simulator/BoxParameters";
import { InputsParameters } from "./simulator/InputsParameters";
import { policyFromList } from "./util";

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

function reducer(state, action) {
  switch (action.type) {
    case 'INIT UID': return {
      ...state,
      uid: action.uid
    }
  }
}

export default function ParameterProvider(props) {
  let boxParams = BoxParameters();
  let inputsParams = InputsParameters();

  let [policies] = useState(policyFromList(Array(8).fill([])));
  let [uid, setUID] = useState(0);

  let initialState = {
    uid: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  let parameters2 = {
    uid: uid,
    values: {
      policies,
      ...inputsParams.values,
      ...boxParams.values,
    },
    functions: {
      ...boxParams.functions,
      ...inputsParams.functions,
      setUID,
    },
  };

  let parameters = [state, dispatch];

  return (
    <Context.Provider value={parameters2}>{props.children}</Context.Provider>
  );
}
