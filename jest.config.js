const tsJestPath = "/Users/amarkumarsingh/.nvm/versions/node/v24.12.0/lib/node_modules/ts-jest";

module.exports = {
    "testEnvironment": "node",
    "testMatch": [
        "**/test/**/*.test.ts",
        "**/test/**/*.test.js"
    ],
    "transform": {
        "^.+\\.ts$": [
            tsJestPath,
            {
                "tsconfig": "<rootDir>/tsconfig.json"
            }
        ]
    },
    "moduleNameMapper": {
        "^@ostro/support/(.*)$": "<rootDir>/../support/src/$1",
        "^@ostro/support$": "<rootDir>/../support/src",
        "^@ostro/contracts/(.*)$": "<rootDir>/../contracts/src/$1",
        "^@ostro/contracts$": "<rootDir>/../contracts/src",
        "^@ostro/container/(.*)$": "<rootDir>/../container/$1",
        "^@ostro/container$": "<rootDir>/../container",
        "^@ostro/filesystem/(.*)$": "<rootDir>/../filesystem/$1",
        "^@ostro/filesystem$": "<rootDir>/../filesystem/filesystemManager",
        "^@ostro/http/(.*)$": "<rootDir>/src/$1",
        "^@ostro/http$": "<rootDir>/src/index"
    },
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageReporters": [
        "text",
        "lcov",
        "clover"
    ],
    "collectCoverageFrom": [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/test/**",
        "!<rootDir>/coverage/**",
        "!<rootDir>/build/**",
        "!<rootDir>/node_modules/**",
        "!<rootDir>/jest.config.js"
    ]
};
