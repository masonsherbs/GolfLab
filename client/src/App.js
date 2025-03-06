import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SubscriptionManager from './components/SubscriptionManager';
import SubscriptionList from './components/SubscriptionList';
import ApiTest from './components/ApiTest';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn 
                ? <Navigate to="/" /> 
                : <Login onLoginSuccess={handleLoginSuccess} />
            } 
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <header className="App-header">
                  <h1>GolfLab</h1>
                  <ApiTest />
                  <SubscriptionManager />
                  <h1>GolfLab Subscription System</h1>
                  <SubscriptionManager />
                  <SubscriptionList />
                </header>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;