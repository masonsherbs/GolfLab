import React, { useState } from 'react';
import axios from 'axios';

function ApiTest() {
  const [apiResponse, setApiResponse] = useState('');

  const handleTestApi = async () => {
    try {
      console.log('Sending request to /api/hello');
        const response = await axios.get('http://localhost:3001/api/hello', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response received:', response);
      setApiResponse(response.data.message);
    } catch (error) {
      console.error('Error calling API:', error.response || error);
      setApiResponse(`Error calling API: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>API Test</h2>
      <button onClick={handleTestApi}>Test API</button>
      {apiResponse && <p>API Response: {apiResponse}</p>}
    </div>
  );
}

export default ApiTest;