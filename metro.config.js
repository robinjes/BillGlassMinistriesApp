const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable package exports to resolve subpath exports correctly
config.resolver.unstable_enablePackageExports = true;

// Performance optimizations
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'];

// Development optimizations
if (process.env.NODE_ENV === 'development') {
  // Faster bundling in development
  config.transformer.minifierConfig = {
    keep_fnames: true,
    mangle: false,
    compress: false,
  };
  
  // Enable faster file watching
  config.watchFolders = [__dirname];
  config.resolver.unstable_enableSymlinks = false;
  
  // Optimize resolver for development
  config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
  
  // Enable faster source maps
  config.transformer.enableBabelRCLookup = false;
  config.transformer.enableBabelRuntime = false;
  
  // Disable source maps in development for faster builds
  config.transformer.minifierPath = require.resolve('metro-minify-terser');
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
} else {
  // Production optimizations
  config.transformer.minifierConfig = {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  };
  
  config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
}

module.exports = config;
