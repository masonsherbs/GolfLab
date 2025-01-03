const express = require('express');
const cors = require('cors');
const { Subscription } = require('./models');
const { Sequelize } = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const db = require('./models');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch(err => console.error('Unable to connect to the database:', err));
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GolfLab server!' });
});

// Example route using the User model
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// New route to create a subscription
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { number } = req.body;
    const subscription = await Subscription.create({ number });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
});
// New route to get the most recent subscription
app.get('/api/subscriptions/latest', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      order: [['createdAt', 'DESC']]
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest subscription' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});