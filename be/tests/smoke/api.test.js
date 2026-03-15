const request = require('supertest');
const app = require('../../src/app');

describe('API Smoke Tests', () => {
    it('GET /health should return 200 and status UP', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'Server UP');
    });
});

describe('API Smoke Tests', () => {
    it('GET /api/my-ip should return 200 and an IP address', async () => {
        const response = await request(app).get('/api/my-ip');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ip');
        expect(response.body).toHaveProperty('message', 'IP retrieved successfully');
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/api/unknown-route');
        expect(response.status).toBe(404);
    });
});