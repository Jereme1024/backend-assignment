module.exports = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [
        ".git/.*",
        "node_modules/.*"
    ],
    coverageDirectory: "coverage"
}
