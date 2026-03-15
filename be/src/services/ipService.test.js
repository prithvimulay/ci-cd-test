const { formatIpData } = require('../../src/services/ipService');

describe('IP Service Unit Tests', () => {
    it('should format the IP data correctly', () => {
        const mockIp = '192.168.1.1';
        const result = formatIpData(mockIp);

        expect(result.ip).toBe(mockIp);
        expect(result.message).toBe("IP retrieved successfully");
        expect(result).toHaveProperty('timestamp');
    });

    it('should throw an error if no IP is provided', () => {
        expect(() => formatIpData(null)).toThrow("IP Address is missing");
    });
});