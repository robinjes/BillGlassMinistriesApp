#!/bin/bash

# Fast development build script
echo "🚀 Starting fast development build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf ios/build
rm -rf .expo
rm -rf /tmp/metro-cache

# Set development environment
export NODE_ENV=development
export EXPO_USE_FAST_RESOLVER=1
export EXPO_USE_METRO_WORKERS=4

# Build iOS app directly (this will start Metro automatically)
echo "📱 Building iOS app..."
npx expo run:ios --no-build-cache

echo "✅ Fast development build complete!"
