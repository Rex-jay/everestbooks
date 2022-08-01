/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    clearMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    roots: ["<rootDir>/"],
    testMatch: ["<rootDir>/routes/__test__/*.test.ts"],
};