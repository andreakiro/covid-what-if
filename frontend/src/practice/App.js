import React, { useEffect, useState } from "react";
import { Graph, Graph1 } from "./components/Graph";
import Layout from "./components/Layout";

async function API(a, b) {
  let request = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ a, b }),
  };
  let result = await fetch("http://localhost:5000", request);
  let final = await result.json();
  return final.result;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Box(props) {
  let [box1, setBox1] = useState("0");
  let [box2, setBox2] = useState("0");
  let [loading, setLoading] = useState(false);
  let [result, setResult] = useState(0);
  let foo = async () => {
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(1000); // wait 1s bro
    setResult(r);
    setLoading(false);

    // facon alternative
    // API(box1, box1).then(r => { setResult(r); setLoading(false); } );
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
      {/* <p>{box1} + {box2} = {parseInt(box1, 10) + parseInt(box2, 10)}</p> */}
      <p className="bg-red-400 mx-1 px-1 py-1 rounded shadow-inner text-white text-center">
        {box1} + {box2} = {loading ? "?" : result}
      </p>
    </div>
  );
}

function BoxIntelligente(props) {
  let [box1, setBox1] = useState("0");
  let [box2, setBox2] = useState("0");
  let [loading, setLoading] = useState(false);
  let [result, setResult] = useState(0);

  useEffect(() => {
    foo();
  }, [box1, box2]);

  let foo = async () => {
    // if (box1 === '' || box2 === '')
    if (box1 === "") box1 = 0;
    if (box2 === "") box2 = 0;
    // faire l appel et modifier la page
    // utiliser le .then pour quand c est fini dire que cest fini
    // update les trucs
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(1000); // wait 1s bro
    setResult(r);
    setLoading(false);

    // facon alternative
    // API(box1, box1).then(r => { setResult(r); setLoading(false); } );
  };
  return (
    <div className="Counter">
      <input value={box1} onChange={(e) => setBox1(e.target.value)} />
      <input value={box2} onChange={(e) => setBox2(e.target.value)} />
      {/* <p>{box1} + {box2} = {parseInt(box1, 10) + parseInt(box2, 10)}</p> */}
      <p>
        {box1} + {box2} = {loading ? "?" : result}
      </p>
    </div>
  );
}

function Counter(props) {
  let [count, setCount] = useState(props.initial);
  return (
    <div className="Counter">
      <p>{count}</p>
      <button onClick={() => setCount((x) => x + 1)}> CLICK ON ME BRO </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Layout>
        <Graph />
        {/* <Graph1 /> */}
        {/* <Box /> */}
        {/* <BoxIntelligente /> */}
        {/* <Counter initial={3}/> */}
      </Layout>
    </>
  );
}

function Hey() {
  return (
    <>
      <Layout>
        <div className="App">
          <header className="App-header">
            <p>Hey bro I need to start working on the backend now</p>
          </header>
        </div>
      </Layout>
    </>
  );
}

export default App;
