import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionManager() {
  const [number, setNumber] = useState('');
  const [latestSubscription, setLatestSubscription] = useState(null);

  const handleCreateSubscription = async () => {
    try {
      await axios.post('http://localhost:3001/api/subscriptions', { number: parseInt(number) });
      setNumber('');
      alert('Subscription created successfully!');
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to create subscription');
    }
  };

  const handleGetLatestSubscription = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/subscriptions/latest');
      setLatestSubscription(response.data);
    } catch (error) {
      console.error('Error fetching latest subscription:', error);
      alert('Failed to fetch latest subscription');
    }
  };

  return (
    <div>
      <h2>Subscription Manager</h2>
      <div>
        <input 
          type="number" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
          placeholder="Enter subscription number"
        />
        <button onClick={handleCreateSubscription}>Create Subscription</button>
      </div>
      <div>
        <button onClick={handleGetLatestSubscription}>Get Latest Subscription</button>
        {latestSubscription && (
          <p>Latest Subscription Number: {latestSubscription.number}</p>
        )}
      </div>
    </div>
  );
}

export default SubscriptionManager;