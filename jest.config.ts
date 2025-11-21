import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
  ],
  collectCoverageFrom: [
    "src/pages/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
};

export default createJestConfig(customJestConfig);
