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

async function loadData(state, setData, setTarget) {
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
  // update policies with dispatch
}

async function updateData(state, setData) {
  let request = {
    uid: state.uid,
    country: state.country,
    tframe: {
      from: state.tframe.from,
      until: state.tframe.until,
    },
    policies: state.policies,
  };
  let data = await update(request);
  setData(data);
}

export default function GraphManager() {
  let [state, dispatch] = useParameters();
  let [data, setData] = useState([]);
  let [target, setTarget] = useState([]);

  let [oldCountry, setOldCountry] = useState(state.country);

  useEffect(() => {
    if (oldCountry !== state.country) loadData(state, setData, setTarget);
    setOldCountry(state.country);
  }, [state]);
  // useEffect(() => updateData(parameters.values, setData), [parameters]);

  return <Graph bigdata={[data, target]} />;
}
