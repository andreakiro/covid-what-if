import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { load, update } from "../../API";
import { useParameters } from "../../parameters/ParameterProvider";
import Graph from "./Graph";

function zip(arrays) {
  return arrays.length === 0
    ? []
    : arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
          return array[i];
        });
      });
}

function formatData(values, dates) {
  let cleanDates = dates.map((x) => x.slice(0, 10));
  let zipped = zip([cleanDates, values]);
  return zipped.map((x) => ({
    date: d3.timeParse("%Y-%m-%d")(x[0]),
    value: x[1],
  }));
}

async function loadData(state, dispatch, setData, setTarget) {
  let request = {
    uid: state.uid,
    country: state.country,
    tframe: {
      from: state.tframe.from,
      until: state.tframe.until,
    },
  };

  let { pred, target, dates, policies } = await load(request);
  setData(formatData(pred, dates));
  setTarget(formatData(target, dates));
  delete policies["h6_level"];
  dispatch({
    type: "setup",
    policies: policies,
    pinned: true,
  });
}

async function updateData(state, dispatch, setData, setTarget) {
  let newPolicies = state.policies;
  let request = {
    uid: state.uid,
    country: state.country,
    tframe: {
      from: state.tframe.from,
      until: state.tframe.until,
    },
    policies: state.trigger === 1 ? newPolicies : null,
  };
  let { pred, target, dates } = await update(request);
  setData(formatData(pred, dates));
  setTarget(formatData(target, dates));
  if (state.trigger === 2)
    dispatch({
      type: "crop",
    });
  dispatch({
    type: "resettrigger",
  });
}

export default function GraphManager() {
  let [state, dispatch] = useParameters();
  let [data, setData] = useState([]);
  let [target, setTarget] = useState([]);
  let [oldCountry, setOldCountry] = useState(state.country);

  useEffect(() => {
    if (oldCountry !== state.country)
      loadData(state, dispatch, setData, setTarget);
    setOldCountry(state.country);
  }, [state, dispatch, oldCountry]);

  useEffect(() => {
    if (state.trigger !== 0) updateData(state, dispatch, setData, setTarget);
  }, [state, dispatch]);

  return <Graph bigdata={[data, target]} />;
}
