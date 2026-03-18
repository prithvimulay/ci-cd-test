const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validate.middleware');
const { createKitchenSchema } = require('../validators/kitchen.validator');
const { createMenuSchema } = require('../validators/menu.validator');

const { createKitchen, getKitchens, getKitchenById } = require('../controllers/kitchen.controller');
const { addMenuToKitchen, getKitchenMenus, updateMenu, deleteMenu } = require('../controllers/menu.controller');

// Kitchen endpoints
router.post('/', validate(createKitchenSchema), createKitchen);
router.get('/', getKitchens);
router.get('/:id', getKitchenById);
router.delete('/:id', async (req, res) => res.status(501).json({ message: "Not Implemented directly yet" }));

// Menu endpoints per Kitchen
router.post('/:id/menu', validate(createMenuSchema), addMenuToKitchen);
router.get('/:id/menu', getKitchenMenus);

// Menu endpoints directly by menuId
router.put('/menu/:menuId', updateMenu);
router.delete('/menu/:menuId', deleteMenu);

module.exports = router;
