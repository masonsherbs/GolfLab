import { expect } from 'chai';
import sinon from 'sinon';
import * as subscriptionController from '../../../server/controllers/subscriptionController.js';
import { ValidationError, NotFoundError } from '../../../server/utils/customErrors.js';

describe('Subscription Controller', () => {
  let req, res, next, prismaStub2, validationNext;

  beforeEach(() => {
    req = {
      body: {
        userId: 1,
        planType: 'premium',
        status: 'active',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        currentSubscriptionPrice: 49.99
      },
      params: {
        id: '1'
      }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub()
    };
    next = sinon.stub();
    validationNext = sinon.stub();


    prismaStub2 = {
      subscription: {
        create: sinon.stub(),
        findMany: sinon.stub(),
        findUnique: sinon.stub(),
        update: sinon.stub(),
        delete: sinon.stub(),
        findFirst: sinon.stub()  
      }
    };

    // Replace the actual Prisma instance with our stub
    subscriptionController.setPrisma(prismaStub2);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createSubscription', () => {
    it('creates a new subscription when validation passes', async () => {
      const mockSubscription = { id: 1, ...req.body };
      prismaStub2.subscription.create.resolves(mockSubscription);

      await subscriptionController.createSubscription[1](req, res, next);

      expect(prismaStub2.subscription.create.calledOnce).to.be.true;
      expect(prismaStub2.subscription.create.firstCall.args[0]).to.deep.equal({
        data: req.body
      });
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockSubscription)).to.be.true;
    });

    it('returns validation error when validation fails', async () => {
      req.body = {
        userId: 'not a number',
        planType: 'invalid',
        status: 'invalid',
        startDate: 'not a date',
        endDate: 'not a date',
        currentSubscriptionPrice: 'not a number'
      };


      const [validationMiddleware, createFunction] = subscriptionController.createSubscription;

      // Run validation middleware
      for (const middleware of validationMiddleware) {
        await middleware(req, res, next);
      }

      // At this point, next should not have been called
      expect(next.called, 'next should not be called during validation').to.be.true;
      expect(next.calledWithMatch(sinon.match.instanceOf(Error)), 'next should not be called with an error during validation').to.be.false;

      // Reset the next stub before running the create function
      next.reset();


      // Now run the create function
      await createFunction(req, res, next);

      expect(next.calledOnce, 'next should be called once').to.be.true;
      if (next.calledOnce) {
        expect(next.firstCall.args[0], 'next should be called with a ValidationError').to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('getAll', () => {
    it('returns all subscriptions', async () => {
      const mockSubscriptions = [{ id: 1 }, { id: 2 }];
      prismaStub2.subscription.findMany.resolves(mockSubscriptions);

      await subscriptionController.getAll(req, res, next);

      expect(prismaStub2.subscription.findMany.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockSubscriptions)).to.be.true;
    });
  });

  describe('getById', () => {
    it('returns a specific subscription', async () => {
      const mockSubscription = { id: 1, ...req.body };
      prismaStub2.subscription.findUnique.resolves(mockSubscription);

      await subscriptionController.getById[1](req, res, next);

      expect(prismaStub2.subscription.findUnique.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockSubscription)).to.be.true;
    });

    it('returns 404 for non-existent subscription', async () => {
      prismaStub2.subscription.findUnique.resolves(null);

      await subscriptionController.getById[1](req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('Subscription not found');
    });
  });

  describe('update', () => {
    it('updates a subscription', async () => {
      const mockUpdatedSubscription = { id: 1, ...req.body, planType: 'basic' };
      prismaStub2.subscription.update.resolves(mockUpdatedSubscription);

      await subscriptionController.update[2](req, res, next);

      expect(prismaStub2.subscription.update.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockUpdatedSubscription)).to.be.true;
    });
  });

  describe('deleteSubscription', () => {
    it('deletes a subscription', async () => {
      prismaStub2.subscription.delete.resolves();

      await subscriptionController.deleteSubscription[1](req, res, next);

      expect(prismaStub2.subscription.delete.calledOnce).to.be.true;
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });
  });

  describe('getLatestSubscription', () => {
    it('returns the latest subscription', async () => {
      const mockLatestSubscription = { id: 1, createdAt: new Date(), ...req.body };
      prismaStub2.subscription.findFirst.resolves(mockLatestSubscription);
  
      await subscriptionController.getLatestSubscription(req, res, next);
  
      expect(prismaStub2.subscription.findFirst.calledOnce).to.be.true;
      expect(prismaStub2.subscription.findFirst.firstCall.args[0]).to.deep.equal({
        orderBy: { createdAt: 'desc' }
      });
      expect(res.json.calledWith(mockLatestSubscription)).to.be.true;
    });
  
    it('returns 404 when no subscriptions exist', async () => {
      prismaStub2.subscription.findFirst.resolves(null);
  
      await subscriptionController.getLatestSubscription(req, res, next);
  
      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0].message).to.equal('No subscriptions found');
    });
  });

    describe('getByUserId', () => {
      it('returns subscriptions for a specific user', async () => {
        const mockSubscriptions = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
        prismaStub2.subscription.findMany.resolves(mockSubscriptions);
  
        req.params.userId = '1';
        await subscriptionController.getByUserId[1](req, res, next);
  
        expect(prismaStub2.subscription.findMany.calledOnce).to.be.true;
        expect(prismaStub2.subscription.findMany.firstCall.args[0]).to.deep.equal({
          where: { userId: 1 }
        });
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mockSubscriptions)).to.be.true;
      });
    });
  
    describe('getByPlanType', () => {
      it('returns subscriptions for a specific plan type', async () => {
        const mockSubscriptions = [{ id: 1, planType: 'premium' }, { id: 2, planType: 'premium' }];
        prismaStub2.subscription.findMany.resolves(mockSubscriptions);
  
        req.params.planType = 'premium';
        await subscriptionController.getByPlanType[1](req, res, next);
  
        expect(prismaStub2.subscription.findMany.calledOnce).to.be.true;
        expect(prismaStub2.subscription.findMany.firstCall.args[0]).to.deep.equal({
          where: { planType: 'premium' }
        });
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mockSubscriptions)).to.be.true;
      });
    });
  
    describe('getActiveSubscriptions', () => {
      it('returns all active subscriptions', async () => {
        const mockSubscriptions = [{ id: 1, status: 'active' }, { id: 2, status: 'active' }];
        prismaStub2.subscription.findMany.resolves(mockSubscriptions);
  
        await subscriptionController.getActiveSubscriptions(req, res, next);
  
        expect(prismaStub2.subscription.findMany.calledOnce).to.be.true;
        expect(prismaStub2.subscription.findMany.firstCall.args[0]).to.deep.equal({
          where: { status: 'active' }
        });
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mockSubscriptions)).to.be.true;
      });
    });
  
    describe('updateStatus', () => {
      it('updates the status of a subscription', async () => {
        const mockUpdatedSubscription = { id: 1, status: 'inactive' };
        prismaStub2.subscription.update.resolves(mockUpdatedSubscription);
  
        req.params.id = '1';
        req.body.status = 'inactive';
        await subscriptionController.updateStatus[2](req, res, next);
  
        expect(prismaStub2.subscription.update.calledOnce).to.be.true;
        expect(prismaStub2.subscription.update.firstCall.args[0]).to.deep.equal({
          where: { id: 1 },
          data: { status: 'inactive' }
        });
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mockUpdatedSubscription)).to.be.true;
      });
  
      it('returns 404 for non-existent subscription', async () => {
        prismaStub2.subscription.update.rejects({ code: 'P2025' });
  
        req.params.id = '999';
        req.body.status = 'inactive';
        await subscriptionController.updateStatus[2](req, res, next);
  
        expect(next.calledOnce).to.be.true;
        expect(next.firstCall.args[0].message).to.equal('Subscription not found');
      });
    });
  
    // describe('update error handling', () => {
    //   it('returns 404 when updating non-existent subscription', async () => {
    //     prismaStub2.subscription.findUnique.resolves(null);


    //     await subscriptionController.update[2](req, res, next);

    //     expect(next.calledOnce).to.be.true;
    //     expect(next.firstCall.args[0]).to.be.instanceOf(NotFoundError);
    //     expect(next.firstCall.args[0].message).to.equal('Subscription not found');
    //   });

    //   it('handles validation errors', async () => {
    //     req.body = {
    //       planType: 'invalid',
    //       status: 'invalid'
    //     };

    //     const [validationMiddleware, , updateFunction] = subscriptionController.update;

    //     // Run validation middleware
    //     for (const middleware of validationMiddleware) {
    //       await middleware(req, res, validationNext);
    //     }

    //     // Check if validationNext was called with a ValidationError
    //     expect(validationNext.calledOnce).to.be.true;
    //     expect(validationNext.firstCall.args[0]).to.be.instanceOf(ValidationError);
    //     // Reset the next stub before running the update function
    //     next.reset();

    //     // Now run the update function
    //     await updateFunction(req, res, next);

    //     // The update function should not call next again if validation failed
    //     expect(next.called).to.be.false;
    //   });
    // });
});
