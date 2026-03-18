const { z } = require('zod');

const createMenuSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        price: z.number().positive("Price must be greater than 0")
    })
});

module.exports = { createMenuSchema };