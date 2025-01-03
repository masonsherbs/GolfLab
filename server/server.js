// require('dotenv').config();
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('../models');
const cors = require('cors');

function createServer() {
  const app = express();
  const port = process.env.PORT || 3001;

  console.log('Setting up middleware...');
  // Add this before any other middleware
  app.use((req, res, next) => {
    console.log('Raw headers:', req.rawHeaders);
    next();
  });

  // Enable CORS for all routes
  app.use(cors());

  // Increase the limit for request headers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Query:', JSON.stringify(req.query, null, 2));
    next();
  });

  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../public')));
  // Database connection
  // const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  //   host: process.env.DB_HOST,
  //   dialect: 'mysql'
  // });
  const sequelize = new Sequelize(config.database, config.username, config.password, config);


  // Test the connection
  sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database'))
    .catch(err => console.error('Unable to connect to the database:', err));

  app.get('/api/hello', (req, res) => {
    console.log('GET /api/hello endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Header sizes:', Object.entries(req.headers).map(([key, value]) => `${key}: ${value.length}`));
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

  return { app, sequelize };
}

// If this script is run directly, start the server
if (require.main === module) {
  const { app } = createServer();
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = createServer;