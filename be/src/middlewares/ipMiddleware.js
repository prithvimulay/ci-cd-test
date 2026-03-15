const extractIp = (req, res, next) => {
    // Check for forwarded IP if behind a proxy, otherwise use remote address
    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Clean up local IPv6 localhost for cleaner UI display
    if (clientIp === '::1') clientIp = '127.0.0.1';

    req.clientIp = clientIp;
    next();
};

module.exports = { extractIp };