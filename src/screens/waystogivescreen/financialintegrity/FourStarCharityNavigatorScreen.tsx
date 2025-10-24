import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function FourStarCharityNavigatorScreen() {
  const handleCharityNavigatorPress = () => {
    Linking.openURL('https://www.charitynavigator.org/');
  };

  const handleLetterPress = () => {
    Linking.openURL('https://irp.cdn-website.com/cb495078/files/uploaded/2019%20Charity%20Navigator%20Letter%205701%20Nolan.pdf');
  };

  const handleProfilePress = () => {
    Linking.openURL('https://www.charitynavigator.org/ein/752733954');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderText}>What is the Charity Navigator?</Text>
        <Text style={styles.bodyText}>
          <Text 
            style={styles.linkText} 
            onPress={handleCharityNavigatorPress}
          >
            Charity Navigator
          </Text>
          {' '}is the most-utilized charity evaluator in America. The organization helps guide intelligent giving by evaluating the Financial Health, Accountability and Transparency of over 8,000 charities and provides basic data on the rest of the 1.4 million U.S. nonprofits. Charity Navigator accepts no advertising or donations from the organizations it evaluates, ensuring unbiased evaluations, nor does it charge the public for this trusted data. As a result, Charity Navigator, a non-profit 501 (c) (3) public charity itself, depends on support from individuals, corporations and foundations that believe it provides a much-needed service to America's charitable givers.
        </Text>
        
        <Text style={styles.subheaderText}>About Our Rating</Text>
        <Text style={styles.bodyText}>
          We are proud to announce that for the fifth year in a row, Bill Glass Behind the Walls was awarded the highest rating by Charity Navigator for financial integrity and responsibility. Click{' '}
          <Text 
            style={styles.linkText} 
            onPress={handleLetterPress}
          >
            here
          </Text>
          {' '}to read the letter. You may also visit our profile with Charity Navigator{' '}
          <Text 
            style={styles.linkText} 
            onPress={handleProfilePress}
          >
            here
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subheaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  linkText: {
    color: '#1e3a5f',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});
