module.exports = {
    moduleFileExtensions: ['js', 'vue', 'json', 'ts', 'tsx'],
    watchman: false,
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|svg\\?inline)$': 'jest-transform-stub',
        '^.+\\.(js)?$': 'babel-jest',
    },
    collectCoverage: true,
    coverageThreshold: {
        'global': {'statements': 90},
    },
    testResultsProcessor: 'jest-sonar-reporter',
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/tests/setup.js',
    ],
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: [
        '<rootDir>/tests/**/*.spec.(js)',
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
};
