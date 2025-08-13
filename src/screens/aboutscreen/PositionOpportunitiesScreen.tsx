import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PositionOpportunitiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Position Opportunities</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});
