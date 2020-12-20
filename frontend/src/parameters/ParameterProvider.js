import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./Reducer";
import { policyFromList } from "./Util";

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
    policynames: {},
    policies: policyFromList(null),
    tframe: {
      from: null,
      until: null,
      range: null,
    },
    box: {
      height: 0,
      width: 8,
      level: null,
    },
    order: [],
    unactives: [],
    trigger: 0, // 0 = nothing 1 = policies 2 = TF
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  let parameters = [state, dispatch];

  return (
    <Context.Provider value={parameters}>{props.children}</Context.Provider>
  );
}
