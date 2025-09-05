import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function JoinLocalTeamScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const positions = [
    {
      title: 'HEAD/ASSISTANT COACH',
      description: 'Works within the community establishing partnerships with churches, team members, and sponsors. Acts as local leader; recruiting, delegating necessary tasks, providing structure and accountability. Takes on mentorship role with Assistant Coach, preparing them for future leadership roles.'
    },
    {
      title: 'FUNDRAISING COACH',
      description: 'Responsible for raising local funds, maintaining relationships with sponsors/donors, working with churches on potential partnerships. Knows local budget and expenses well.'
    },
    {
      title: 'HOSPITALITY COACH',
      description: 'Acquires relevant charitable contributions (food, beverages, gift bags) for staff, team members, speakers. Recruits volunteers. Manages hospitality room set up, tear down, and through the duration of the event. Plans Friday night meal and in-facility food in conjunction with relevant parties.'
    },
    {
      title: 'MEDIA/PHOTO/VIDEO COACH',
      description: 'Manages media captured throughout event, recruits volunteers, transfers captured media to home office. Follows BGBTW guidance on desirable content.'
    },
    {
      title: 'PRAYER COACH',
      description: 'Develops network of prayer warriors throughout different groups and meetings. Maintains prayer “newsletter” that can be sent to local prayer groups, churches, and team members.'
    },
    {
      title: 'RECORDING SECRETARY',
      description: 'Records minutes at meetings, communicates scheduled meeting times/locations.'
    },
    {
      title: 'RECRUITING COACH',
      description: 'Leads local recruiting efforts in conjunction with the rest of local team. Schedules recruiting events at local churches. Identifies target demographics and forms relationships with relevant authorities in those circles.'
    },
    {
      title: 'TAILGATE/EQUIP & IGNITE COACH',
      description: 'Organizes event space at local church. Works with church in recruiting necessary volunteers and delegating necessary tasks. Partners with Hospitality coach in organizing event logistics.'
    },
    {
      title: 'TRANSPORTATION COACH',
      description: 'Recruits necessary volunteer drivers, plans driver schedule, and prepares routes. Ensures proper avenues of communication between drivers, passengers, and staff.'
    },
    {
      title: 'ENTIRE LOCAL TEAM',
      description: 'Involved in community recruiting events, maintaining relationships with interested churches and organizations, attending monthly meetings when possible. Keeps a healthy heart for evangelism, missions, and mobilization!'
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Join a Local Team</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.boldQuestion}>What is a Local Team?</Text>
          <Text style={styles.bodyText}>
            The success of Bill Glass Ministries events relies heavily on groups of Teammates who work closely with the Regional Director to facilitate both Behind and Beyond the Walls Champions events. Lots of preparation is required to put on an event and Local Teams are instrumental in recruiting people, churches, raising funds, transportation, and more. It can take up to 12 months to plan and execute an event and Local Teams play an integral part throughout the entire process.
          </Text>
          <Text style={styles.bodyText}>
            There may be a team already functioning in your area. If you are interested in joining that team, click the button below and indicate the role in which you would like to serve. Not sure there is one in your area and you want to start a team, click the button below and indicate the role in which you would like to serve!
          </Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.joinButton} onPress={() => navigation.navigate('JoinLocalTeamForm')}>
              Join a Local Team
            </Text>
          </View>
        </View>
        <View style={styles.positionsContainer}>
          <Text style={styles.positionsTitle}>Local Team Positions</Text>
          {positions.map((pos, i) => (
            <View key={pos.title} style={styles.positionItem}>
              <TouchableOpacity style={styles.positionRow} onPress={() => setOpenIndex(openIndex === i ? null : i)}>
                <Text style={styles.positionTitle}>{pos.title}</Text>
                <Ionicons
                  name={openIndex === i ? 'chevron-down' : 'chevron-forward'}
                  size={22}
                  color="#1e3a5f"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
              {openIndex === i && (
                <Text style={styles.positionDescription}>{pos.description}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionsContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 0,
  },
  positionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 18,
  },
  positionItem: {
    marginBottom: 18,
  },
  positionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  positionDescription: {
    fontSize: 16,
    color: '#222',
    marginTop: 2,
    lineHeight: 22,
  },
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    width: '100%',
    backgroundColor: '#1e3a5f',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    alignSelf: 'center',
  },
    sectionContainer: {
      width: '94%',
      alignSelf: 'center',
      marginTop: 32,
      marginBottom: 0,
    },
    boldQuestion: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1e3a5f',
      marginBottom: 8,
    },
    bodyText: {
      fontSize: 17,
      color: '#222',
      marginBottom: 12,
      lineHeight: 24,
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      marginBottom: 24,
      width: '100%',
    },
    joinButton: {
      backgroundColor: '#f7b731',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
      paddingVertical: 16,
      paddingHorizontal: 36,
      borderRadius: 12,
      overflow: 'hidden',
      textAlign: 'center',
      elevation: 2,
    },
});
