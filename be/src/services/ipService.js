const formatIpData = (ipAddress) => {
    if (!ipAddress) {
        throw new Error("IP Address is missing");
    }
    return {
        ip: ipAddress,
        message: "IP retrieved successfully",
        timestamp: new Date().toISOString()
    };
};

module.exports = { formatIpData };