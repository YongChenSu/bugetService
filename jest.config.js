module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JavaScript files
  },
  // ... existing code ...
  testEnvironment: 'node', // Ensure the test environment is set to Node
  // ... existing code ...
};