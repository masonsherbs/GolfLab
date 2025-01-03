import React from 'react';
import ApiTest from './components/ApiTest';
import SubscriptionManager from './components/SubscriptionManager';

// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GolfLab</h1>
        <ApiTest />
        <SubscriptionManager />
      </header>
    </div>
  );
}

export default App;