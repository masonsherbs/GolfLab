import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../server/server.mjs';
import * as subscriptionController from '../../server/controllers/subscriptionController.js';
import jwt from 'jsonwebtoken';

describe('Subscription Routes', () => {
  let prismaStub, token;

    before(() => {
        // Create a mock token with access level 3 (highest level)
        token = jwt.sign({ id: 1, email: 'test@example.com', accessLevel: 3 }, process.env.JWT_SECRET || 'test_secret');
    });
  beforeEach(() => {
    prismaStub = {
      subscription: {
        create: sinon.stub(),
        findMany: sinon.stub(),
        findUnique: sinon.stub(),
        update: sinon.stub(),
        delete: sinon.stub()
      }
    };

    subscriptionController.setPrisma(prismaStub);

    // Stub the auth middleware to always pass
    // sinon.stub(app._router, 'handle').callsFake((req, res, next) => {
    //   req.user = { id: 1 }; // Mock authenticated user
    //   next();
    // });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /api/subscriptions', () => {
    it('creates a new subscription', async () => {
      const subscriptionData = {
        userId: 1,
        planType: 'premium',
        status: 'active',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        currentSubscriptionPrice: 49.99
      };

      const mockSubscription = { id: 1, ...subscriptionData };
      prismaStub.subscription.create.resolves(mockSubscription);

      const response = await request(app)
        .post('/api/subscriptions')
        .set('Authorization', `Bearer ${token}`)
        .send(subscriptionData);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(mockSubscription);
    });

    it('returns 400 for invalid subscription data', async () => {
      const invalidData = {
        userId: 1,
        planType: 'invalid',
        status: 'active'
      };

      const response = await request(app)
        .post('/api/subscriptions')
        .send(invalidData)
        .set('Authorization', `Bearer ${token}`);


      expect(response.status).to.equal(400);
    });
  });

  describe('GET /api/subscriptions', () => {
    it('returns all subscriptions', async () => {
      const mockSubscriptions = [
        { id: 1, userId: 1, planType: 'premium' },
        { id: 2, userId: 2, planType: 'basic' }
      ];
      prismaStub.subscription.findMany.resolves(mockSubscriptions);

      const response = await request(app)
        .get('/api/subscriptions')
        .set('Authorization', `Bearer ${token}`);


      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockSubscriptions);
    });
  });

  describe('GET /api/subscriptions/:id', () => {
    it('returns a specific subscription', async () => {
      const mockSubscription = { id: 1, userId: 1, planType: 'premium' };
      prismaStub.subscription.findUnique.resolves(mockSubscription);

      const response = await request(app)
        .get('/api/subscriptions/1')
        .set('Authorization', `Bearer ${token}`);


      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockSubscription);
    });

    it('returns 404 for non-existent subscription', async () => {
      prismaStub.subscription.findUnique.resolves(null);

      const response = await request(app)
        .get('/api/subscriptions/999')
        .set('Authorization', `Bearer ${token}`);


      expect(response.status).to.equal(404);
    });
  });

  describe('PUT /api/subscriptions/:id', () => {
    it('updates a subscription', async () => {
      const updateData = {
          userId: 1,
          planType: 'basic',
          status: 'inactive',
          startDate: '2023-01-01',
          endDate: '2024-01-01',
          currentSubscriptionPrice: 39.99
      };
      const mockUpdatedSubscription = { id: 1, ...updateData };
      prismaStub.subscription.update.resolves(mockUpdatedSubscription);

      const response = await request(app)
        .put('/api/subscriptions/1')
        .send(updateData)
        .set('Authorization', `Bearer ${token}`);


      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockUpdatedSubscription);
    });
  });

  describe('DELETE /api/subscriptions/:id', () => {
    it('deletes a subscription', async () => {
      prismaStub.subscription.delete.resolves();

      const response = await request(app)
        .delete('/api/subscriptions/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.equal(204);
    });
  });
});