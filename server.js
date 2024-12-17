require("dotenv").config()
require("./config/database")
const express = require("express");
const cors = require('cors')
const path = require("path")
const app = express();
const port = process.env.PORT || 5000
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger/v1.json');
const adminSwaggerSpec = require('./swagger/admin.json');

// cors middleware
app.use(cors())

app.use(express.json({ limit: '150mb' }));
// app.use(express.text({ type: 'text/plain' }));
app.use(express.urlencoded({
  extended: true
}));

// Custom logging middleware
// const logger = require('./src/middleware/logger');
// app.use(logger);

// encryption middleware
// const { decryptRequest, encryptResponse } = require('./src/middleware/encryption');
// app.use(decryptRequest)
// app.use(encryptResponse)

app.use(express.static(path.join(__dirname, 'public')))

// Serve Swagger documentation for users
app.use('/api-docs', swaggerUI.serveFiles(swaggerSpec, {}), swaggerUI.setup(swaggerSpec, { explorer: true }));
app.use('/api-docs-admin', swaggerUI.serveFiles(adminSwaggerSpec, {}), swaggerUI.setup(adminSwaggerSpec, { explorer: true }));

//Routes
const AdminIndexRoute = require("./src/routes/admin/index.route");
const errorHandler = require("./src/middleware/errorHandler");
const UserIndexRouteV1 = require("./src/routes/v1/index.route")

app.use("/api/admin", AdminIndexRoute)
app.use("/api/v1", UserIndexRouteV1)

// Catch-all for unknown routes (404 handler)
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.statusCode = 404;
  next(error);
});

// Global error-handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})