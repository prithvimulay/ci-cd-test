const ipService = require('../services/ipService');

const getMyIp = (req, res) => {
    try {
        const ipData = ipService.formatIpData(req.clientIp);
        res.status(200).json(ipData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getMyIp };