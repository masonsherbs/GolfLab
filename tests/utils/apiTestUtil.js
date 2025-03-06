import axios from 'axios';

const apiTestUtil = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    return response.data.token;
  },

  callProtectedEndpoint: async (endpoint, method = 'get', data = null, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios[method](`http://localhost:5000${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      console.error('API call failed:', error.response.data);
      throw error;
    }
  }
};

export default apiTestUtil;