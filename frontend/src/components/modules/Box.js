import React, { useState } from "react";
import { API, timeout } from "../../Utility.js";

export default function Box(props) {
  let [box1, setBox1] = useState("0");
  let [box2, setBox2] = useState("0");
  let [loading, setLoading] = useState(false);
  let [result, setResult] = useState(0);
  let foo = async () => {
    let empty = false;
    if (box1 === "" || box2 === "") {
      empty = true;
      if (box1 === "") box1 = 0;
      if (box2 === "") box2 = 0;
    }
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(100);
    setResult(r);
    setLoading(false);
    if (empty) {
      if (box1 === 0) setBox1(0);
      if (box2 === 0) setBox2(0);
    }
  };
  return (
    <div className="flex flex-col space-y-4 w-32">
      <input
        className="bg-green-400 mx-1 px-1 py-1 rounded shadow-inner text-white text-center"
        size="5"
        value={box1}
        onChange={(e) => setBox1(e.target.value)}
      />
      <input
        className="bg-green-400 mx-1 px-1 py-1 rounded shadow-inner text-white text-center"
        size="5"
        value={box2}
        onChange={(e) => setBox2(e.target.value)}
      />
      <button
        className="bg-blue-400 mx-1 px-2 py-1 rounded shadow text-white hover:bg-blue-300"
        onClick={() => foo()}
      >
        Sum
      </button>
      <p className="bg-red-400 mx-1 px-1 py-1 rounded shadow-inner text-white text-center">
        {box1} + {box2} = {loading ? "?" : result}
      </p>
    </div>
  );
}
