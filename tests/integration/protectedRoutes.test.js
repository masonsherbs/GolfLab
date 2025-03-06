import { expect } from 'chai';
import apiTestUtil from '../utils/apiTestUtil.js';

describe('Protected Routes', () => {
  let token;

  before(async () => {
    // Login and get token
    token = await apiTestUtil.login('test@example.com', 'password123');
  });

  it('should access a protected route with valid token', async () => {
    const result = await apiTestUtil.callProtectedEndpoint('/api/users', 'get', null, token);
    expect(result).to.be.an('array');
  });

  it('should fail to access a protected route without token', async () => {
    try {
      await apiTestUtil.callProtectedEndpoint('/api/users', 'get', null, null);
    } catch (error) {
      expect(error.response.status).to.equal(401);
    }
  });
});