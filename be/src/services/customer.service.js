const prisma = require('../lib/prisma');

const createCustomer = async (data) => {
    return prisma.customer.create({ data });
};

const getAllCustomers = async () => {
    return prisma.customer.findMany();
};

module.exports = {
    createCustomer,
    getAllCustomers
};
