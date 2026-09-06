module.exports = {
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.js"],
    transform: {},
    moduleNameMapper: {
        "^@ostro/support/(.*)$": "<rootDir>/../support/$1",
        "^@ostro/support$": "<rootDir>/../support",
        "^@ostro/contracts/(.*)$": "<rootDir>/../contracts/$1",
        "^@ostro/contracts$": "<rootDir>/../contracts",
        "^@ostro/container/(.*)$": "<rootDir>/../container/$1",
        "^@ostro/container$": "<rootDir>/../container",
        "^@ostro/filesystem/(.*)$": "<rootDir>/../filesystem/$1",
        "^@ostro/filesystem$": "<rootDir>/../filesystem/filesystemManager.js",
        "^@ostro/http/(.*)$": "<rootDir>/$1",
        "^@ostro/http$": "<rootDir>/index.js"
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "clover"],
    collectCoverageFrom: [
        "<rootDir>/**/*.js",
        "!<rootDir>/test/**",
        "!<rootDir>/coverage/**",
        "!<rootDir>/node_modules/**",
        "!<rootDir>/jest.config.js"
    ]
};
