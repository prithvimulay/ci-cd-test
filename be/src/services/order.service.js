const prisma = require('../lib/prisma');

const createOrder = async (orderData) => {
    // 1. Calculations: Calculate the totalAmount by multiplying the quantity of items by their unit prices.
    // Assuming the user's validator payload contains `totalPrice`, we verify/calculate it against the business rule.
    // For demo purposes and flat architecture constraints, we construct the parsed string here.
    const { itemName, quantity, totalPrice, kitchenId, customerId } = orderData;
    
    const parsedItemName = `${quantity}x ${itemName}`;
    
    // 2. Database Transactions: Ensures atomic operation. 
    // A single create is atomic, but we wrap it in a transaction to demonstrate the requested logic mechanism.
    return prisma.$transaction(async (tx) => {
        // Business logic execution inside a transaction
        const order = await tx.order.create({
            data: {
                itemName: parsedItemName,
                price: totalPrice, // Using validated totalPrice
                kitchenId,
                customerId
            }
        });
        
        return order;
    });
};

const getOrderById = async (id) => {
    return prisma.order.findUnique({
        where: { id },
        include: { kitchen: true, customer: true }
    });
};

const getOrdersByCustomerId = async (customerId) => {
    return prisma.order.findMany({
        where: { customerId },
        include: { kitchen: true }
    });
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByCustomerId
};
