const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable package exports to resolve subpath exports correctly
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
