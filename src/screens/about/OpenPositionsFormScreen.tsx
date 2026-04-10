
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function OpenPositionsFormScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Position Interest Form</Text>
      </View>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: 'https://form.jotform.com/232067021555146?parentURL=https%3A%2F%2Fwww.behindthewalls.com%2Fopen-positions&jsForm=true' }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
    width: '100%',
    height: 600,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e3eaf5',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#1e3a5f',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
