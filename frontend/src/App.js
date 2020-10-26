import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import Team from "./pages/Team";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Layout currentPage="home">
            <Home />
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
          <Layout currentPage="simulator">
            <Simulator />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
