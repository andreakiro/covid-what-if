import React from "react";
import Graph from "./components/Graph";
import Layout from "./components/Layout";
import Strength from "./components/Strenght";

function App() {
  return (
    <>
      <Layout>
        <Graph />
        <Strength />
      </Layout>
    </>
  );
}

export default App;
