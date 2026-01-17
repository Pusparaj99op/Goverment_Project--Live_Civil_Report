/**
 * Jest Configuration
 * For testing both backend (Node.js) and frontend (React/Next.js) code
 */

module.exports = {
    // Test environment
    testEnvironment: 'node',

    // Test file patterns
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],

    // Coverage configuration
    collectCoverageFrom: [
        'server/**/*.js',
        '!server/config/**',
        '!**/node_modules/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        }
    },

    // Test timeout
    testTimeout: 30000,

    // Setup files
    setupFilesAfterEnv: ['<rootDir>/server/__tests__/setup.js'],

    // Module paths
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/server/$1'
    },

    // Files to ignore
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '/coverage/'
    ],

    // Verbose output
    verbose: true,

    // Force exit after tests complete
    forceExit: true,

    // Clear mocks between tests
    clearMocks: true,

    // Detect open handles
    detectOpenHandles: true
};
