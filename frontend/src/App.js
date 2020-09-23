import React from 'react';
import logo from './style/logo.svg';
import './style/App.css';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Layout/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey bro I need to start working on the backend now
        </p>
      </header>
    </div>
  );
}

export default App;
