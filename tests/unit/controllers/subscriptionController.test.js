import { expect } from 'chai';
import sinon from 'sinon';
import { Subscription } from '../../../server/models/index.js';
import * as subscriptionController from '../../../server/controllers/subscriptionController.js';

describe('Subscription Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
      json: sinon.spy()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });


it('should create a new subscription with valid input data', async () => {
  const subscriptionData = {
    userId: 1,
    planType: 'premium',
    status: 'active'
  };
  req.body = subscriptionData;

  const createdSubscription = { id: 1, ...subscriptionData };
  const createStub = sinon.stub(Subscription, 'create').resolves(createdSubscription);

  await subscriptionController.createSubscription(req, res, next);

  expect(createStub.calledOnceWith(subscriptionData)).to.be.true;
  expect(res.status.calledOnceWith(201)).to.be.true;
  expect(res.status().json.calledOnceWith(createdSubscription)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return the latest subscription when calling getLatestSubscription', async () => {
  const latestSubscription = {
    id: 1,
    userId: 1,
    planType: 'premium',
    status: 'active',
    createdAt: new Date()
  };

  const findOneStub = sinon.stub(Subscription, 'findOne').resolves(latestSubscription);

  await subscriptionController.getLatestSubscription(req, res, next);

  expect(findOneStub.calledOnceWith({
    order: [['createdAt', 'DESC']]
  })).to.be.true;
  expect(res.json.calledOnceWith(latestSubscription)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return all subscriptions when calling getAll', async () => {
  const subscriptions = [
    { id: 1, userId: 1, planType: 'basic', status: 'active' },
    { id: 2, userId: 2, planType: 'premium', status: 'active' }
  ];

  const findAllStub = sinon.stub(Subscription, 'findAll').resolves(subscriptions);

  await subscriptionController.getAll(req, res, next);

  expect(findAllStub.calledOnce).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(subscriptions)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return a specific subscription when calling getById with a valid ID', async () => {
  const subscriptionId = 1;
  const subscription = {
    id: subscriptionId,
    userId: 1,
    planType: 'premium',
    status: 'active'
  };

  req.params.id = subscriptionId;
  const findByPkStub = sinon.stub(Subscription, 'findByPk').resolves(subscription);

  await subscriptionController.getById(req, res, next);

  expect(findByPkStub.calledOnceWith(subscriptionId)).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(subscription)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return a 404 error when calling getById with an invalid ID', async () => {
  const invalidId = 9999;
  req.params.id = invalidId;
  const findByPkStub = sinon.stub(Subscription, 'findByPk').resolves(null);

  await subscriptionController.getById(req, res, next);

  expect(findByPkStub.calledOnceWith(invalidId)).to.be.true;
  expect(res.status.calledOnceWith(404)).to.be.true;
  expect(res.status().json.calledOnceWith({ message: 'Subscription not found' })).to.be.true;
  expect(next.called).to.be.false;
});

it('should update a subscription with valid input data', async () => {
  const subscriptionId = 1;
  const updateData = {
    planType: 'premium',
    status: 'active'
  };
  const updatedSubscription = { id: subscriptionId, ...updateData };

  req.params.id = subscriptionId;
  req.body = updateData;

  const updateStub = sinon.stub(Subscription, 'update').resolves([1]);
  const findByPkStub = sinon.stub(Subscription, 'findByPk').resolves(updatedSubscription);

  await subscriptionController.update(req, res, next);

  expect(updateStub.calledOnceWith(updateData, { where: { id: subscriptionId } })).to.be.true;
  expect(findByPkStub.calledOnceWith(subscriptionId)).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(updatedSubscription)).to.be.true;
  expect(next.called).to.be.false;
});

it('should delete a subscription when calling delete with a valid ID', async () => {
  const subscriptionId = 1;
  req.params.id = subscriptionId;

  const destroyStub = sinon.stub(Subscription, 'destroy').resolves(1);

  await subscriptionController.delete(req, res, next);

  expect(destroyStub.calledOnceWith({ where: { id: subscriptionId } })).to.be.true;
  expect(res.status.calledOnceWith(204)).to.be.true;
  expect(res.status().json.calledOnceWith({ message: 'Subscription deleted' })).to.be.true;
  expect(next.called).to.be.false;
});

it('should return all subscriptions for a specific user when calling getByUserId', async () => {
  const userId = 1;
  const userSubscriptions = [
    { id: 1, userId: userId, planType: 'basic', status: 'active' },
    { id: 2, userId: userId, planType: 'premium', status: 'active' }
  ];

  req.params.userId = userId;
  const findAllStub = sinon.stub(Subscription, 'findAll').resolves(userSubscriptions);

  await subscriptionController.getByUserId(req, res, next);

  expect(findAllStub.calledOnceWith({ where: { userId: userId } })).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(userSubscriptions)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return all subscriptions of a specific plan type when calling getByPlanType', async () => {
  const planType = 'premium';
  const subscriptions = [
    { id: 1, userId: 1, planType: planType, status: 'active' },
    { id: 2, userId: 2, planType: planType, status: 'active' }
  ];

  req.params.planType = planType;
  const findAllStub = sinon.stub(Subscription, 'findAll').resolves(subscriptions);

  await subscriptionController.getByPlanType(req, res, next);

  expect(findAllStub.calledOnceWith({ where: { planType: planType } })).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(subscriptions)).to.be.true;
  expect(next.called).to.be.false;
});

it('should return only active subscriptions when calling getActiveSubscriptions', async () => {
  const activeSubscriptions = [
    { id: 1, userId: 1, planType: 'basic', status: 'active' },
    { id: 2, userId: 2, planType: 'premium', status: 'active' }
  ];

  const findAllStub = sinon.stub(Subscription, 'findAll').resolves(activeSubscriptions);

  await subscriptionController.getActiveSubscriptions(req, res, next);

  expect(findAllStub.calledOnceWith({ where: { status: 'active' } })).to.be.true;
  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.status().json.calledOnceWith(activeSubscriptions)).to.be.true;
  expect(next.called).to.be.false;
});
});
