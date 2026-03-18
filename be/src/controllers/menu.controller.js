const menuService = require('../services/menu.service');

const addMenuToKitchen = async (req, res) => {
    try {
        const kitchenId = parseInt(req.params.id, 10);
        const menu = await menuService.addMenuToKitchen(kitchenId, req.body);
        
        res.status(201).json({ status: 'success', data: menu });
    } catch (error) {
        if (error.message === 'Kitchen not found') {
            return res.status(404).json({ status: 'error', message: error.message });
        }
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getKitchenMenus = async (req, res) => {
    try {
        const kitchenId = parseInt(req.params.id, 10);
        const menus = await menuService.getMenusByKitchenId(kitchenId);
        
        res.status(200).json({ status: 'success', data: menus });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updateMenu = async (req, res) => {
    try {
        const menuId = parseInt(req.params.menuId, 10);
        const menu = await menuService.updateMenu(menuId, req.body);
        res.status(200).json({ status: 'success', data: menu });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menuId = parseInt(req.params.menuId, 10);
        await menuService.deleteMenu(menuId);
        res.status(200).json({ status: 'success', message: 'Menu deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    addMenuToKitchen,
    getKitchenMenus,
    updateMenu,
    deleteMenu
};
