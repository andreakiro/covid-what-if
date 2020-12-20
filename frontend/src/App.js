import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import SimulatorContainer from "./pages/SimulatorContainer";
import Team from "./pages/Team";

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
        <Route path="/">
          <Layout currentPage="home">
            <Home />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
