// Node Test Runner Script for Testly Automated Test Suite

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const { runScoringTests } = require('./scoring.test.js');

try {
  const { passed, failed } = runScoringTests();
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (err) {
  console.error('Test execution error:', err);
  process.exit(1);
}
