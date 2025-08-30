import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AssistingTheChurchScreen() {
  const navigation = useNavigation<any>();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assisting the Church</Text>
      
      <Text style={styles.body}>
        Founded in 1969, the ministry focus of Bill Glass Behind the Walls has always been evangelism. Our mission is to come alongside local churches to reinforce evangelism training with their congregation and then take them behind the walls of correctional facilities across the country to share the Good News of the Gospel with the "least of these". Those equipped individuals will return home with a renewed desire to serve the church and newfound confidence to boldly share the Good News at home, at work, in their communities, and beyond.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Do</Text>
        
        <Text style={styles.subtitle}>WE . . .</Text>
        
        <Text style={styles.body}>
          • Train believers—Using a proven method of instruction including role play, we conduct a basic session on how to use a Scripture tract to present the Gospel.
        </Text>
        
        <Text style={styles.body}>
          • Take believers—We immediately immerse them in evangelism by taking them into prisons, jails, juvenile facilities, and shelters where they are:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>GOD . . .</Text>
        
        <Text style={styles.body}>
          • Transforms believers as they witness the life-changing power of the Holy Spirit.
        </Text>
        
        <Text style={styles.body}>
          • Transforms churches as ignited believers begin to reach their own cities with the message of the Gospel.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biblical Basis</Text>
        
        <Text style={styles.body}>
          • Obedience: And he said to them, "Go into all the world and proclaim the Gospel to the whole creation." Mark 16:15
        </Text>
        
        <Text style={styles.body}>
          • Discipleship: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son, and of the Holy Spirit, teaching them to observe all that I have commanded you" Matthew 28:19-20
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practical Basis</Text>
        
        <Text style={styles.body}>
          • A changed heart results in a changed behavior: 85% of those presently incarcerated will at some point be released.
        </Text>
        
        <Text style={styles.body}>
          • Reduction in recidivism rate among offenders: Texas recidivism rates have fallen over 40% as a result of faith-based ministry involvement according to Vance Drum, former Head of Chaplaincy for the Texas Department of Criminal Justice.
        </Text>
        
        <Text style={styles.body}>
          • Over 80% of church growth is transfer growth as opposed to new converts to Christianity: A trained and ignited believer can reach many new people with the Gospel, infusing churches with new life.
        </Text>
      </View>

      <View style={styles.quoteSection}>
        <Text style={styles.quoteTitle}>Pastor JD Davis of Dublin, OH, on the Effectiveness of Bill Glass Behind the Walls Events</Text>
        
        <Text style={styles.quote}>
          "As far as Dublin Baptist Church is concerned, you helped train several of the members to share their faith, not just in prisons, but on Sunday mornings and wherever life carries them."
        </Text>
        
        <Text style={styles.quote}>
          "…it's more than just a one day event. It's more than just training some people, sending them to prison and calling it done. It really does equip your people to share their faith and in that environment, it is set up to be so easy for them to share their faith. For some of them they may have never done that before. But they take that first step and they lead someone to Jesus and they find out they can do this and suddenly they do want to do more. They do want to show up and serve in other areas because they begin to believe, 'You know what? I can do this!'"
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events')}>
          <Text style={styles.buttonText}>Event Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ways to Give')}>
          <Text style={styles.buttonText}>Support Us</Text>
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
    marginBottom: 16,
    lineHeight: 26,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 16,
    fontFamily: 'System',
  },
  subtitle: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'System',
  },
  quoteSection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f7b731',
  },
  quoteTitle: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'System',
  },
  quote: {
    color: '#222',
    fontSize: 16,
    fontFamily: 'System',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 12,
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
