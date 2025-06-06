// File: /Users/masonsherburne/Documents/GitHub/GolfLab/server/config/swagger.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GolfLab API',
      version: '1.0.0',
      description: 'API documentation for GolfLab services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./server/routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
