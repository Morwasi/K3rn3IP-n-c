// In your app.js or server.js
const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const app = express();

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret); // This should print your secret if stored properly.


// Use middleware globally or for specific routes
app.use('/api/', jwtMiddleware);

// Example setup for routing to microservices
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/notification', require('./routes/notificationRoutes'));
// Add additional routes as necessary

app.listen(80, () => {
    console.log('API Gateway is running on port 80');
});
