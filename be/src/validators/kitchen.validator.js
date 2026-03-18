const { z } = require('zod');

const createKitchenSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        ownerName: z.string().min(2, "Owner name is required"),
        capacity: z.number().positive("Capacity must be greater than 0")
    })
});

module.exports = { createKitchenSchema };