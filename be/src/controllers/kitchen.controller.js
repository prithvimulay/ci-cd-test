const kitchenService = require('../services/kitchen.service');

const createKitchen = async (req, res) => {
    try {
        const kitchen = await kitchenService.createKitchen(req.body);
        res.status(201).json({ status: 'success', data: kitchen });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getKitchens = async (req, res) => {
    try {
        const kitchens = await kitchenService.getAllKitchens();
        res.status(200).json({ status: 'success', data: kitchens });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getKitchenById = async (req, res) => {
    try {
        const kitchenId = parseInt(req.params.id, 10);
        const kitchen = await kitchenService.getKitchenById(kitchenId);

        if (!kitchen) {
            return res.status(404).json({ status: 'error', message: 'Kitchen not found' });
        }
        res.status(200).json({ status: 'success', data: kitchen });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createKitchen,
    getKitchens,
    getKitchenById
};
