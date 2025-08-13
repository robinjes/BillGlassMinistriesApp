import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AboutBillGlassScreen() {
  const navigation = useNavigation<any>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Bill Glass Behind the Walls</Text>
      <Text style={styles.body}>
        Early on, ministry founder Bill Glass noticed an unusual aspect of athletic success: When he talked, people listened. More than that, people asked him to talk. As a star football player in high school, an all-American at Baylor, and a defensive stalwart during eleven years in the NFL, Glass was regularly invited to stand up and say a few words. As his friends will tell you, Glass has always been an utterly straightforward sort of person. So when he stood to talk, he spoke about the things closest to his heart. He talked about sports, and he talked about Christ. And thus, a dynamic nationwide ministry was born.
      </Text>
      <Text style={styles.body}>
        His Dallas-based ministry is now called Bill Glass Behind the Walls. With a dedicated staff and volunteers numbering in the thousands, the ministry is known for its high-energy Day of Champions and Weekend of Champions events conducted inside prisons across the country. Bill said a board member kept badgering him to take his message into prison. “I kept resisting. I was frightened that I wouldn’t fit in with street kids and gangsters in prison.” After overcoming his fears, he saw dramatic results. “I was thrown into it kicking and screaming, but the response from the inmates was just unbelievable,” he said.
      </Text>
      <Text style={styles.body}>
        He spent much of the last fifty years ‘behind the walls.’ He has taken along other pro athletes, champion weight lifters, magicians, tight-rope walkers – as well as race cars, stunt planes, motorcycles, and just about anything or anyone else – to draw prisoners out for a message of hope and deliverance. He discovered that prison inmates are just like everyone else: They will listen to what an athlete has to say, and they will respond to a heartfelt Christian witness.
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statement of Faith')}>
          <Text style={styles.buttonText}>Statement of Faith</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events')}>
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
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
  body: {
    color: '#222',
    fontSize: 17,
    fontFamily: 'System',
    marginBottom: 22,
    lineHeight: 26,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#f7b731',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
