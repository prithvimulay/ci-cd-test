const prisma = require('../lib/prisma');

const addMenuToKitchen = async (kitchenId, menuData) => {
    const kitchen = await prisma.kitchen.findUnique({ where: { id: kitchenId } });
    if (!kitchen) {
        throw new Error('Kitchen not found');
    }

    return prisma.menu.create({
        data: {
            ...menuData,
            kitchenId
        }
    });
};

const getMenusByKitchenId = async (kitchenId) => {
    return prisma.menu.findMany({
        where: { kitchenId }
    });
};

module.exports = {
    addMenuToKitchen,
    getMenusByKitchenId
};
