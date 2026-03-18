const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validate.middleware');
const { createCustomerSchema } = require('../validators/customer.validator');
const { createCustomer, getCustomers } = require('../controllers/customer.controller');
const { getCustomerOrders } = require('../controllers/order.controller');

// Customer endpoints
router.post('/', validate(createCustomerSchema), createCustomer);
router.get('/', getCustomers);

// Customer's order history
router.get('/:id/orders', getCustomerOrders);

module.exports = router;
