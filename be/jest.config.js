module.exports = {
    testEnvironment: 'node',
    projects: [
        {
            displayName: 'unit',
            testMatch: ['<rootDir>/src/**/*.test.js'],
        },
        {
            displayName: 'smoke',
            testMatch: ['<rootDir>/tests/smoke/**/*.test.js'],
        }
    ]
};