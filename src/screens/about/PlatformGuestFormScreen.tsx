import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PlatformGuestFormScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://form.jotform.com/billglass/platform-guest-prospect?parentURL=https%3A%2F%2Fwww.behindthewalls.com%2Fplatform-guest-prospect-form&jsForm=true' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
