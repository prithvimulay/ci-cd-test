const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validate.middleware');
const { createKitchenSchema } = require('../validators/kitchen.validator');
const { createMenuSchema } = require('../validators/menu.validator');

const { createKitchen, getKitchens, getKitchenById } = require('../controllers/kitchen.controller');
const { addMenuToKitchen, getKitchenMenus } = require('../controllers/menu.controller');

// Kitchen endpoints
router.post('/', validate(createKitchenSchema), createKitchen);
router.get('/', getKitchens);
router.get('/:id', getKitchenById);

// Menu endpoints per Kitchen
router.post('/:id/menu', validate(createMenuSchema), addMenuToKitchen);
router.get('/:id/menu', getKitchenMenus);

module.exports = router;
