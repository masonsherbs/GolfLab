import React from 'react';
import SubscriptionManager from './components/SubscriptionManager';
import SubscriptionList from './components/SubscriptionList';
import ApiTest from './components/ApiTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GolfLab</h1>
        <ApiTest />
        <SubscriptionManager />
        <h1>GolfLab Subscription System</h1>
        <SubscriptionManager />
        <SubscriptionList />
      </header>
    </div>
  );
}

export default App;