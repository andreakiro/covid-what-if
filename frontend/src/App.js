import React, { useEffect, useState } from "react";
import "./style/App.css";
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
    // faire l appel et modifier la page
    // utiliser le .then pour quand c est fini dire que cest fini
    // update les trucs
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(1000) // wait 1s bro
    setResult(r);
    setLoading(false);

    // facon alternative
    // API(box1, box1).then(r => { setResult(r); setLoading(false); } );
  };
  return (
    <div className="Counter">
      <input value={box1} onChange={(e) => setBox1(e.target.value)} />
      <input value={box2} onChange={(e) => setBox2(e.target.value)} />
      <button onClick={() => foo()}>Sum</button>
      {/* <p>{box1} + {box2} = {parseInt(box1, 10) + parseInt(box2, 10)}</p> */}
      <p>
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

  useEffect(() => {foo()}, [box1, box2])
  
  let foo = async () => {
    if (box1 === '' || box2 === '') return
    else {
      // faire l appel et modifier la page
      // utiliser le .then pour quand c est fini dire que cest fini
      // update les trucs
      setLoading(true);
      let r = await API(box1, box2);
      await timeout(1000) // wait 1s bro
      setResult(r);
      setLoading(false);

      // facon alternative
      // API(box1, box1).then(r => { setResult(r); setLoading(false); } );
    }
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
        <Box />
        <BoxIntelligente />
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
