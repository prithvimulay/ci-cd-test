const { sleep } = require('./ipController');

describe('IP Controller Logic Tests', () => {
    it('should delay execution for the specified time', async () => {
        const start = Date.now();
        const delay = 500; // 500 milliseconds

        await sleep(delay);

        const end = Date.now();
        const elapsed = end - start;

        // Assert that at least 490ms have passed (allowing small variations in Node's event loop)
        expect(elapsed).toBeGreaterThanOrEqual(490);
    });
});