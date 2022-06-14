const swaggerJsDoc = require('swagger-jsdoc');
const constants = require('./constants');
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Refractio API",
        version: "1.0.0",
        description: "Refractio Express Library API",
        contact: {
          name: "API Support"
        },
      },
  
      servers: [
        {
          url: constants.SERVER_HOST,
          description: "Refractio API Documentation",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
          },
        },
      },
    },
    apis: ["./server/src/routes/*.js"],
  };
  
  module.exports = swaggerJsDoc(options);
  