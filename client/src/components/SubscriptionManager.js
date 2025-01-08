import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionManager() {
  const [planType, setPlanType] = useState('monthly');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateSubscription = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/subscriptions', { planType, userId: parseInt(userId) });
      setMessage(`Subscription created successfully! ID: ${response.data.id}`);
    } catch (error) {
      setMessage(`Error creating subscription: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Subscription Manager</h2>
      <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="pay-per-use">Pay Per Use</option>
      </select>
      <input 
        type="number" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        placeholder="User ID"
      />
      <button onClick={handleCreateSubscription}>Create Subscription</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubscriptionManager;