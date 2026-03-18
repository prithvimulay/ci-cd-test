// Mock the prisma dependency entirely first
jest.mock('../lib/prisma', () => ({
    $transaction: jest.fn(),
    order: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn()
    },
    menu: {
        findFirst: jest.fn()
    }
}));

const prisma = require('../lib/prisma');
const { createOrder, getOrderById, getOrdersByCustomerId, deleteOrder } = require('./order.service');

describe('Order Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createOrder()', () => {
        it('should successfully calculate total price and create the order in a transaction', async () => {
            const orderData = {
                itemName: 'Burger',
                quantity: 2,
                kitchenId: 1,
                customerId: 10
            };

            const mockMenu = { id: 5, name: 'Burger', price: 15.0 };
            const expectedOrder = { id: 100, itemName: '2x Burger', price: 30.0, kitchenId: 1, customerId: 10 };

            // Mock the transaction callback handler to immediately execute the callback provided
            // This mimics Prisma's transaction context `tx`
            prisma.$transaction.mockImplementation(async (callback) => {
                const tx = {
                    menu: { findFirst: jest.fn().mockResolvedValue(mockMenu) },
                    order: { create: jest.fn().mockResolvedValue(expectedOrder) }
                };
                
                const result = await callback(tx);
                
                // We can also assert against the tx mock inside the test if we wanted
                expect(tx.menu.findFirst).toHaveBeenCalledWith({ where: { name: 'Burger', kitchenId: 1 } });
                expect(tx.order.create).toHaveBeenCalledWith({
                    data: {
                        itemName: '2x Burger',
                        price: 30.0,
                        kitchenId: 1,
                        customerId: 10
                    }
                });
                return result;
            });

            const result = await createOrder(orderData);

            expect(prisma.$transaction).toHaveBeenCalled();
            expect(result).toEqual(expectedOrder);
        });

        it('should throw an error if the menu item does not exist', async () => {
            const orderData = {
                itemName: 'UnknownItem',
                quantity: 1,
                kitchenId: 1,
                customerId: 10
            };

            prisma.$transaction.mockImplementation(async (callback) => {
                const tx = {
                    menu: { findFirst: jest.fn().mockResolvedValue(null) }, // simulates item not found
                };
                return callback(tx);
            });

            await expect(createOrder(orderData)).rejects.toThrow("Menu item 'UnknownItem' not found in this kitchen");
        });
    });

    describe('getOrderById()', () => {
        it('should return an order when found', async () => {
            const mockOrder = { id: 1, itemName: '1x Pizza', price: 20 };
            prisma.order.findUnique.mockResolvedValue(mockOrder);

            const result = await getOrderById(1);

            expect(prisma.order.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { kitchen: true, customer: true }
            });
            expect(result).toEqual(mockOrder);
        });
    });

    describe('getOrdersByCustomerId()', () => {
        it('should return a list of orders', async () => {
            const mockOrders = [{ id: 1 }, { id: 2 }];
            prisma.order.findMany.mockResolvedValue(mockOrders);

            const result = await getOrdersByCustomerId(99);

            expect(prisma.order.findMany).toHaveBeenCalledWith({
                where: { customerId: 99 },
                include: { kitchen: true }
            });
            expect(result).toEqual(mockOrders);
        });
    });

    describe('deleteOrder()', () => {
        it('should call prisma.order.delete', async () => {
            prisma.order.delete.mockResolvedValue({ id: 1 });

            await deleteOrder(1);

            expect(prisma.order.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            });
        });
    });
});
