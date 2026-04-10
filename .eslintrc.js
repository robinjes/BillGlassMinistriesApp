/** ESLint (flat config not required): extends Expo’s recommended rules for RN/TS. */
module.exports = {
  root: true,
  extends: ['expo'],
  ignorePatterns: ['/dist/*', '/node_modules/*', '/ios/*', '/android/*', '/.expo/*'],
};
