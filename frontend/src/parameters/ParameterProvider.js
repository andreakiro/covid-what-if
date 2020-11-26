import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./Reducer";
import { initialize } from "./simulator/BoxParameters";
import { policyFromList } from "./util";

const Context = createContext(null);

export function useParameters() {
  return useContext(Context);
}

export default function ParameterProvider(props) {
  let initialState = {
    uid: 0,
    pinned: false,
    country: null,
    countries: [],
    policies: policyFromList(null),
    tframe: {
      from: null,
      until: null,
      range: 0,
    },
    box: {
      height: 2,
      width: 8,
      level: initialize(2, 8),
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  let parameters = [state, dispatch];

  return (
    <Context.Provider value={parameters}>{props.children}</Context.Provider>
  );
}
