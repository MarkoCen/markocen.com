module.exports = {
    rootDir: "../",
    globals: {
        "ts-jest": {
            tsConfigFile: "client/tsconfig.json",
        }
    },
    setupTestFrameworkScriptFile: "<rootDir>client/jest.setup.ts",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    automock: false,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
}