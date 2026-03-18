const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validate.middleware');
const { createOrderSchema } = require('../validators/order.validator');

const { createOrder, getOrderById } = require('../controllers/order.controller');

// Order endpoints
router.post('/', validate(createOrderSchema), createOrder);
router.get('/:id', getOrderById);

module.exports = router;
