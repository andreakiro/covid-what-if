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

async function loadData(params, setData) {
  let request = {
    uid: params.uid,
    country: params.values.country,
    tframe: {
      from: params.values.from,
      until: params.values.until,
    },
  };

  let { pred, target, dates, policies } = await load(request);
  setData(formatData(pred, dates));
  params.functions.setPolicies(policies);
}

async function updateData(params, setData) {
  let request = {
    uid: params.uid,
    country: params.country,
    tframe: {
      from: params.from,
      until: params.until,
    },
    policies: params.policies,
  };
  let data = await update(request);
  setData(data);
}

export default function GraphManager() {
  let parameters = useParameters();
  let [data, setData] = useState([]);
  let target = useState([]);

  useEffect(() => {
    loadData(parameters, setData);
  }, [parameters.values.country]);
  // useEffect(() => updateData(parameters.values, setData), [parameters]);
  // useEffect(() => updateData2(), [parameters]);

  return <Graph bigdata={[data, target]} />;
}

// let sampleDates = [
//   "2013-04-28 00:00:00",
//   "2013-04-29 00:00:00",
//   "2013-05-01 00:00:00",
//   "2013-05-02 00:00:00",
//   "2013-05-03 00:00:00",
//   "2013-05-04 00:00:00",
//   "2013-05-05 00:00:00",
//   "2013-05-06 00:00:00",
//   "2013-05-07 00:00:00",
//   "2013-05-08 00:00:00",
//   "2013-05-09 00:00:00",
//   "2013-05-10 00:00:00",
//   "2013-05-11 00:00:00",
//   "2013-05-12 00:00:00",
//   "2013-05-13 00:00:00",
//   "2013-05-14 00:00:00",
//   "2013-05-15 00:00:00",
//   "2013-05-16 00:00:00",
//   "2013-05-17 00:00:00",
//   "2013-05-18 00:00:00",
//   "2013-05-19 00:00:00",
//   "2013-05-20 00:00:00",
//   "2013-05-21 00:00:00",
//   "2013-05-22 00:00:00",
//   "2013-05-23 00:00:00",
//   "2013-05-24 00:00:00",
//   "2013-05-25 00:00:00",
//   "2013-05-26 00:00:00",
//   "2013-05-27 00:00:00",
//   "2013-05-28 00:00:00",
//   "2013-05-29 00:00:00",
//   "2013-05-30 00:00:00",
//   "2013-05-31 00:00:00",
//   "2013-06-01",
//   "2013-06-02",
//   "2013-06-03",
//   "2013-06-04",
//   "2013-06-05",
//   "2013-06-06",
//   "2013-06-07",
//   "2013-06-08",
//   "2013-06-09",
//   "2013-06-10",
//   "2013-06-11",
//   "2013-06-12",
//   "2013-06-13",
//   "2013-06-14",
//   "2013-06-15",
//   "2013-06-16",
// ];

// let updateData2 = () => {
//   let sampleValues = Array(sampleDates.length).fill(0);
//   for (let i = 0; i < sampleValues.length; i++)
//     sampleValues[i] = Math.random() + 0.5;
//   setData(formatData(sampleValues, sampleDates));
//   for (let i = 0; i < sampleValues.length; i++)
//     sampleValues[i] = Math.random() + 0.5;
//   setTarget(formatData(sampleValues, sampleDates));
// };
