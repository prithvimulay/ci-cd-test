const customerService = require('../services/customer.service');

const createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json({ status: 'success', data: customer });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json({ status: 'success', data: customers });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createCustomer,
    getCustomers
};
