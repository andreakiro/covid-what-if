import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Team from "./pages/Team";
import SimulatorContainer from "./pages/SimulatorContainer";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/simulator">
          <Layout currentPage="simulator">
            <SimulatorContainer />
          </Layout>
        </Route>
        <Route path="/team">
          <Layout currentPage="team">
            <Team />
          </Layout>
        </Route>
        <Route path="/contribute">
          <Layout currentPage="contribute">
            <Contribute />
          </Layout>
        </Route>
        <Route path="/">
          <Layout currentPage="home">
            <Home />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
