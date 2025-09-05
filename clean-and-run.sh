#!/bin/bash

echo "🧹 Cleaning up for smooth app run..."

# Navigate to project directory
cd "$(dirname "$0")"

# Clean iOS build artifacts
echo "Cleaning iOS build artifacts..."
rm -rf ios/build
rm -rf ~/Library/Developer/Xcode/DerivedData

# Clean Metro cache
echo "Cleaning Metro cache..."
npx react-native start --reset-cache &
METRO_PID=$!
sleep 3
kill $METRO_PID

# Clean and reinstall pods if needed
echo "Checking CocoaPods..."
cd ios
pod install --repo-update
cd ..

echo "✅ Cleanup complete! Now running the app..."
npm run ios
