const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        // Controller's only job: Extract req.body, call service, and return response.
        const order = await orderService.createOrder(req.body);
        
        res.status(201).json({ status: 'success', data: order });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const order = await orderService.getOrderById(orderId);

        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }

        res.status(200).json({ status: 'success', data: order });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getCustomerOrders = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id, 10);
        const orders = await orderService.getOrdersByCustomerId(customerId);

        res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getCustomerOrders
};
