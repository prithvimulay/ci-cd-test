const ipService = require('../services/ipService');

// Helper function to simulate network delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMyIp = async (req, res) => {
    try {
        // If a delay is requested via query param (e.g., ?delay=2000), wait before responding
        const delayMs = parseInt(req.query.delay, 10);
        if (delayMs && delayMs > 0) {
            await sleep(delayMs);
        }

        const ipData = ipService.formatIpData(req.clientIp);
        res.status(200).json(ipData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getMyIp, sleep };