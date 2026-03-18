const request = require('supertest');
const app = require('../../src/app');

describe('API Smoke Tests', () => {
    it('GET /health should return 200 and status UP', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'Server UP');
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/api/unknown-route');
        expect(response.status).toBe(404);
    });
});