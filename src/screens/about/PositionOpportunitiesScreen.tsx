import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { PositionOpportunity } from '../../types/positions';
import { fetchPositions } from '../../services/positionsService';

export default function PositionOpportunitiesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [positions, setPositions] = useState<PositionOpportunity[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchPositions()
      .then((data) => {
        if (isMounted) setPositions(data);
      })
      .catch(() => {
        if (isMounted) setPositions([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Position Opportunities</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>
          To show interest in a position,{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Open Positions Form')}>
            click here
          </Text>{' '}
          to complete the form and submit your resume.
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {positions.map((position) => (
          <View key={position.id}>
            <View style={styles.positionDescriptionContainer}>
              <View style={styles.positionHeaderContainer}>
                <Text style={styles.positionHeaderText}>{position.title}</Text>
              </View>
              <Text style={styles.positionDescriptionText}>{position.description}</Text>
            </View>
            {position.jobDescriptionUrl ? (
              <View style={styles.buttonContainer}>
                <Text
                  style={styles.fullJobButton}
                  onPress={() => {
                    const url = position.jobDescriptionUrl;
                    if (url) Linking.openURL(url);
                  }}
                >
                  Full Job Description
                </Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  subHeaderText: {
    color: '#1e3a5f',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#4fc3f7',
    fontWeight: 'bold',
  },
  positionHeaderContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
    marginBottom: 0,
    paddingLeft: 0,
  },
  positionHeaderText: {
    color: '#1e3a5f',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    alignSelf: 'center',
  },
  positionDescriptionContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  positionDescriptionText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
    width: '100%',
  },
  fullJobButton: {
    backgroundColor: '#f7b731',
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2,
  },
  container: { flex: 1, backgroundColor: '#fff' },
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
