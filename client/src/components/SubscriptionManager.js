import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    userId: '',
    planType: 'monthly',
    currentSubscriptionPrice: '',
    startDate: '',
    endDate: '',
    status: 'active',
    sessionsRemaining: '',
  });
  const [updateSubscription, setUpdateSubscription] = useState({
    id: '',
    status: 'active',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/subscriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSubscriptions(response.data);
    } catch (error) {
      setMessage('Error fetching subscriptions: ' + error.message);
    }
  };

  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/subscriptions', newSubscription, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Subscription created successfully');
      fetchSubscriptions();
      setNewSubscription({
        userId: '',
        planType: 'monthly',
        currentSubscriptionPrice: '',
        startDate: '',
        endDate: '',
        status: 'active',
        sessionsRemaining: '',
      });
    } catch (error) {
      setMessage('Error creating subscription: ' + error.message);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/api/subscriptions/${updateSubscription.id}/status`, {
        status: updateSubscription.status
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Subscription status updated successfully');
      fetchSubscriptions();
      setUpdateSubscription({ id: '', status: 'active' });
    } catch (error) {
      setMessage('Error updating subscription status: ' + error.message);
    }
  };

  const handleDeleteSubscription = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/subscriptions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Subscription deleted successfully');
      fetchSubscriptions();
    } catch (error) {
      setMessage('Error deleting subscription: ' + error.message);
    }
  };
  return (
    <div>
      <h2>Subscription Manager</h2>

      <h3>Create New Subscription</h3>
      <form onSubmit={handleCreateSubscription}>
        <input
          type="number"
          placeholder="User ID"
          value={newSubscription.userId}
          onChange={(e) => setNewSubscription({...newSubscription, userId: e.target.value})}
          required
        />
        <select
          value={newSubscription.planType}
          onChange={(e) => setNewSubscription({...newSubscription, planType: e.target.value})}
          required
        >
          <option value="monthly">Monthly</option>
          <option value="pay-per-use">Pay Per Use</option>
          <option value="trial">Trial</option>
          <option value="punch-card">Punch Card</option>
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newSubscription.currentSubscriptionPrice}
          onChange={(e) => setNewSubscription({...newSubscription, currentSubscriptionPrice: e.target.value})}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newSubscription.startDate}
          onChange={(e) => setNewSubscription({...newSubscription, startDate: e.target.value})}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={newSubscription.endDate}
          onChange={(e) => setNewSubscription({...newSubscription, endDate: e.target.value})}
        />
        <input
          type="number"
          placeholder="Sessions Remaining"
          value={newSubscription.sessionsRemaining}
          onChange={(e) => setNewSubscription({...newSubscription, sessionsRemaining: e.target.value})}
        />
        <button type="submit">Create Subscription</button>
      </form>

      <h3>Update Subscription Status</h3>
      <form onSubmit={handleUpdateStatus}>
        <input
          type="number"
          placeholder="Subscription ID"
          value={updateSubscription.id}
          onChange={(e) => setUpdateSubscription({...updateSubscription, id: e.target.value})}
          required
        />
        <select
          value={updateSubscription.status}
          onChange={(e) => setUpdateSubscription({...updateSubscription, status: e.target.value})}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      <h3>All Subscriptions</h3>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            ID: {sub.id}, User ID: {sub.userId}, Plan: {sub.planType}, Status: {sub.status}
            <button onClick={() => handleDeleteSubscription(sub.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubscriptionManager;