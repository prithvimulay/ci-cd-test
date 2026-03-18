const prisma = require('../lib/prisma');

const createOrder = async (orderData) => {
    const { itemName, quantity, kitchenId, customerId } = orderData;
    
    // 2. Database Transactions: Ensures atomic operation.
    return prisma.$transaction(async (tx) => {
        // Find the menu item to get its unit price
        const menu = await tx.menu.findFirst({
            where: { name: itemName, kitchenId }
        });
        
        if (!menu) {
            throw new Error(`Menu item '${itemName}' not found in this kitchen`);
        }

        // 1. Calculations: Calculate the totalAmount by multiplying the quantity by unit price
        const calculatedPrice = menu.price * quantity;
        
        const parsedItemName = `${quantity}x ${itemName}`;
        
        // Create the order with the calculated price
        const order = await tx.order.create({
            data: {
                itemName: parsedItemName,
                price: calculatedPrice,
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

const deleteOrder = async (orderId) => {
    return prisma.order.delete({
        where: { id: orderId }
    });
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByCustomerId,
    deleteOrder
};
