const express = require('express');
const cors = require('cors');

const kitchenRoutes = require('./routes/kitchen.routes');
const customerRoutes = require('./routes/customer.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server UP', timestamp: new Date() });
});

app.use('/api/kitchens', kitchenRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;