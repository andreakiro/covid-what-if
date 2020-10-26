import { useState, useEffect } from "react";

export function InputsParameters() {
  let [country, setCountry] = useState("Global");
  let [from, setFrom] = useState(null);
  let [until, setUntil] = useState(null);

  let inputsParams = {
    country,
    setCountry,
    from,
    setFrom,
    until,
    setFrom,
  };

  return inputsParams;
}
