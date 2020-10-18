import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Simulator from "./pages/Simulator";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contribute from "./pages/Contribute";

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