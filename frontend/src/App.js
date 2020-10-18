import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Simulator from "./components/Simulator";

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

function Home() {
  return <h2>Home</h2>;
}

function Team() {
  return <h2>Team</h2>;
}

function Contribute() {
  return <h2>Contribute</h2>;
}
