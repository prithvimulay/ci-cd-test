const prisma = require('../lib/prisma');

const createKitchen = async (data) => {
    return prisma.kitchen.create({ data });
};

const getAllKitchens = async () => {
    return prisma.kitchen.findMany();
};

const getKitchenById = async (id) => {
    return prisma.kitchen.findUnique({
        where: { id },
        include: { menus: true }
    });
};

module.exports = {
    createKitchen,
    getAllKitchens,
    getKitchenById
};
