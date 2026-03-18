const validate = (schema) => (req, res, next) => {
    try {
        // Zod parses the request data against the schema we provided
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // If it passes, move to the next function (the controller)
        next();
    } catch (error) {
        // If it fails, return a 400 Bad Request immediately
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: error.errors
        });
    }
};

module.exports = { validate };