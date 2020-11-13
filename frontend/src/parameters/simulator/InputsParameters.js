import { useState } from "react";

export function InputsParameters() {
  let [country, setCountry] = useState("Switzerland");
  let [from, setFrom] = useState(null);
  let [until, setUntil] = useState(null);

  let inputsParams = {
    values: {
      country,
      from,
      until,
    },
    functions: {
      setCountry,
      setFrom,
      setUntil,
    },
  };

  return inputsParams;
}
