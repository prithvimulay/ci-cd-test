const { z } = require('zod');

const createOrderSchema = z.object({
    body: z.object({
        itemName: z.string().min(3, "Name must be at least 3 characters"),
        quantity: z.number().positive("Quantity must be greater than 0"),
        totalPrice: z.number().positive("Price must be greater than 0"),
        kitchenId: z.number().positive("Kitchen ID must be greater than 0"),
        customerId: z.number().positive("Customer ID must be greater than 0")
    })
});

module.exports = { createOrderSchema };