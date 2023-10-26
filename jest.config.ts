module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testMatch: ['**/tests/**/*.spec.ts', '**/tests/**/*.e2e-spec.ts'],
  moduleDirectories: ['node_modules'],
  reporters: ['default'],
  coverageReporters: ['lcov', 'cobertura', 'text'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/modules/**/*.ts'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.ts'],
};
