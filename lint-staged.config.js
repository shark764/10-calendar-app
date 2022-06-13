// lint-staged.config.js

// const { lintStagedBaseConfig } = require('@2600hz/commio-native-utilities');

module.exports = {
  'src/**/*.{js,ts,jsx,tsx}': ['yarn run prettify', () => 'tsc --noEmit'],
};
