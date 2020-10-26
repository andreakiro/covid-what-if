import React, { useEffect, useState } from "react";

export function SmartBox(props) {
  let [box1, setBox1] = useState("0");
  let [box2, setBox2] = useState("0");
  let [loading, setLoading] = useState(false);
  let [result, setResult] = useState(0);

  useEffect(() => {
    foo();
  }, [box1, box2]);

  let foo = async () => {
    if (box1 === "") box1 = 0;
    if (box2 === "") box2 = 0;
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(100);
    setResult(r);
    setLoading(false);
    // API(box1, box1).then(r => { setResult(r); setLoading(false); } );
  };
  return (
    <div className="Counter">
      <input value={box1} onChange={(e) => setBox1(e.target.value)} />
      <input value={box2} onChange={(e) => setBox2(e.target.value)} />
      <p>
        {box1} + {box2} = {loading ? "?" : result}
      </p>
    </div>
  );
}

export function Counter(props) {
  let [count, setCount] = useState(props.initial);
  return (
    <div className="Counter">
      <p>{count}</p>
      <button onClick={() => setCount((x) => x + 1)}>Click me</button>
    </div>
  );
}
