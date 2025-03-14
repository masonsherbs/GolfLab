import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState('');

  const fetchAllSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/subscriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSubscriptions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch subscriptions: ' + (err.response?.data?.error || err.message));
      setSubscriptions([]);
    }
  };

  return (
    <div>
      <h2>Subscription List</h2>
      <button onClick={fetchAllSubscriptions}>Fetch All Subscriptions</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map(sub => (
            <li key={sub.id}>
              User ID: {sub.userId}, Plan: {sub.planType}, Status: {sub.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No subscriptions to display</p>
      )}
    </div>
  );
}

export default SubscriptionList;