#!/bin/bash

# Development Build Script for Faster iOS Development
# This script optimizes the build process for development speed

echo "🚀 Starting optimized development build..."

# Set environment variables for faster builds
export RCT_METRO_PORT=8081
export NODE_ENV=development
export EXPO_USE_COMMUNITY_AUTOLINKING=1

# Kill any existing Metro processes
echo "🔄 Cleaning up existing processes..."
pkill -f "Metro" || true
pkill -f "expo" || true

# Clean only what's necessary for development
echo "🧹 Cleaning build cache..."
cd ios
rm -rf build/Debug-iphoneos
rm -rf build/Debug-iphonesimulator
cd ..

# Start Metro bundler in background
echo "📦 Starting Metro bundler..."
npx expo start --dev-client --no-dev --minify &
METRO_PID=$!

# Wait for Metro to be ready
echo "⏳ Waiting for Metro to be ready..."
sleep 10

# Build iOS app with optimizations
echo "🔨 Building iOS app..."
cd ios
xcodebuild \
  -workspace BehindtheWalls.xcworkspace \
  -scheme BehindtheWalls \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 15' \
  -derivedDataPath build \
  -quiet \
  -parallelizeTargets \
  -jobs 8 \
  build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Starting simulator..."
    # Open the app in simulator
    xcrun simctl install booted build/Build/Products/Debug-iphonesimulator/BehindtheWalls.app
    xcrun simctl launch booted com.billglass.behindthewalls
    echo "🎉 App launched successfully!"
else
    echo "❌ Build failed!"
    kill $METRO_PID 2>/dev/null || true
    exit 1
fi

echo "🎯 Development build complete! Metro is running in the background."
echo "💡 To stop Metro, run: kill $METRO_PID"
