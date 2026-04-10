import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StatementOfFaithScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Statement of Faith</Text>
      
      <Text style={styles.subtitle}>WHAT WE BELIEVE</Text>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> the Bible is the inspired, infallible, authoritative Word of God. (Psalms 19:7-11, 2 Timothy 3:16)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> there is one God, eternally existent in three persons: Father, Son, Holy Spirit. (Matthew 28:19, John 1:32-34, Ephesians 4:4-6)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> in the deity of our Lord Jesus Christ, in His virgin birth, His sinless life, His miracles, His vicarious and atoning death through His shed blood, His bodily resurrection, His ascension to the right hand of the Father, and His personal return in power and glory. (John 8:58 and 14:6, Revelation 1:17-18)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> the salvation of lost, sinful man and his regeneration by the Holy Spirit is absolutely essential. (Romans 3:23-25 and 6:23, Ephesians 2:1-3)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> in the present ministry of the Holy Spirit, whose indwelling presence in the Christian enables him/her to live a godly life. (John 14:16-18, Romans 8:9-11)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> in the spiritual unity of believers in our Lord Jesus Christ. (Ephesians 4:1-3, Philippians 2:1-4)
        </Text>
      </View>
      
      <View style={styles.beliefSection}>
        <Text style={styles.beliefText}>
          <Text style={styles.beliefStart}>We believe</Text> that God intends sexual intimacy to only occur between one biological male (man) and one biological female (woman) who are married to each other.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  title: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 22,
    marginTop: 10,
    fontFamily: 'System',
  },
  subtitle: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 24,
    fontFamily: 'System',
  },
  beliefSection: {
    marginBottom: 20,
    paddingLeft: 8,
  },
  beliefText: {
    color: '#222',
    fontSize: 17,
    fontFamily: 'System',
    lineHeight: 26,
  },
  beliefStart: {
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
});
