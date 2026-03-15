const request = require('supertest');
const app = require('../../src/app');

describe('API Smoke Tests', () => {
    it('GET /health should return 200 and status UP', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'Server UP');
    });

    it('GET /api/my-ip should return 200 and an IP address', async () => {
        const response = await request(app).get('/api/my-ip');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ip');
        expect(response.body).toHaveProperty('message', 'IP retrieved successfully');
    });

    it('GET /api/my-ip?delay=1000 should return 200 after a delay', async () => {
        const start = Date.now();
        const response = await request(app).get('/api/my-ip?delay=1000');
        const end = Date.now();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ip');
        expect(end - start).toBeGreaterThanOrEqual(990); // Verifies the server actually waited
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/api/unknown-route');
        expect(response.status).toBe(404);
    });
});