import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default function MinistryStaffScreen() {
  const [dropdownOpenBill, setDropdownOpenBill] = useState(false);
  const [dropdownOpenMichael, setDropdownOpenMichael] = useState(false);
  return (
    <View style={localStyles.container}>
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
        <Text style={localStyles.bigTitle}>Bill Glass Behind the Walls Staff</Text>
        {/* Bill Glass Section */}
        <View style={localStyles.row}>
          <Image
            source={require('../../../assets/bill-staff.png')}
            style={localStyles.staffImage}
          />
          <View style={localStyles.textContainer}>
            <Text style={localStyles.header}>Bill Glass</Text>
            <Text style={localStyles.subheader}>Founder, 1935-2021</Text>
          </View>
          <TouchableOpacity onPress={() => setDropdownOpenBill((v) => !v)} style={localStyles.arrowContainer}>
            <Ionicons name={dropdownOpenBill ? 'chevron-up' : 'chevron-down'} size={28} color="#1e3a5f" />
          </TouchableOpacity>
        </View>
        {dropdownOpenBill && (
          <View style={localStyles.dropdownContent}>
            <ScrollView style={{ maxHeight: 320 }}>
              <Text style={localStyles.dropdownText}>
                Bill Glass made a name for himself as one of the most outstanding football players in the National Football League. His love for the game started in high school in Corpus Christi. He then went on to play for Baylor University where he became a consensus All-American. Bill was a four time Pro Bowler as a member of the Cleveland Browns team who went on to beat the Baltimore Colts to win the NFL World Championship two years prior to the first Super Bowl. He was also recently inducted into the College and Texas Sports Hall of Fame and the Baylor Wall of Fame.
              </Text>
              <View style={{ height: 18 }} />
              <Text style={localStyles.dropdownText}>
                Bill Glass spent the off-season of his professional football career attending Southwestern Theological Seminary. As his football career was drawing to a close, Bill delivered his personal testimony of faith on television during several Billy Graham Crusades. Dr. Graham urged Bill to consider taking on a new career as a city-wide evangelist. In 1969, he founded the Bill Glass Evangelistic Association, which today is known as Bill Glass Behind the Walls. Then in 1972, Bill began speaking in prison yards all across the country. Bill Glass ministered in thousands of prisons all across the U.S. sharing his passion for evangelism, the ministry focuses on training volunteers how to share their faith in Jesus Christ. In over 50 years of ministry, over 1.5 million men, women, and juvenile offenders have made decisions to follow Christ.
              </Text>
              <View style={{ height: 18 }} />
              <Text style={localStyles.dropdownText}>
                Bill and his late wife, Mavis, have three grown children - Billy, Bobby, and Mindy - along with eight grandchildren, and an ever-increasing number of great-grandchildren!
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Michael Nolan Section */}
        <View style={localStyles.row}>
          <Image
            source={require('../../../assets/nolan-staff.png')}
            style={localStyles.staffImage}
          />
          <View style={localStyles.textContainer}>
            <Text style={localStyles.header}>Michael Nolan</Text>
            <Text style={localStyles.subheader}>CEO</Text>
          </View>
          <TouchableOpacity onPress={() => setDropdownOpenMichael((v) => !v)} style={localStyles.arrowContainer}>
            <Ionicons name={dropdownOpenMichael ? 'chevron-up' : 'chevron-down'} size={28} color="#1e3a5f" />
          </TouchableOpacity>
        </View>
        {dropdownOpenMichael && (
          <View style={localStyles.dropdownContent}>
            <ScrollView style={{ maxHeight: 320 }}>
              <Text style={localStyles.dropdownText}>
                Michael Nolan is a well-respected ministry and business leader with a storied career of fostering responsible growth for ministries and local church organizations. Most recently, Michael served as President of The Operation Andrew Group in Nashville, TN, joining the organization in 2018. Concurrently, he served as President of The Intersection Ministries, a consulting firm he founded in 2017 to come alongside churches and ministry organizations with a network of professionals offering help in strategic planning, finance and business consulting, and operational leadership. From 2005 to 2017, Mr. Nolan was Chief Operating Officer/Chief Finance Officer for GARBC in Arlington Heights, IL. The GARBC is a voluntary partnership of 1,200 independent Baptist churches in the U.S. and over 9,000 churches internationally who are committed to the Great Commission mandate. During his time at GARBC, Michael served as interim COO/CFO at Clarks Summit University (2015-2016). Before joining GARBC, Michael worked with General Motors/GM Financial for eight years as Northeast Director – Sales, Service and Marketing and Executive Officer – Senior Analyst. Michael joined the Bill Glass Behind the Walls team in March of 2020.
              </Text>
              <View style={{ height: 18 }} />
              <Text style={localStyles.dropdownText}>
                Michael and his wife Kristen married in 1991 and have three adult daughters. Mr. Nolan holds an Masters of Business Administration in Marketing and Operations Management from the University of Dallas, and a Bachelor of Science in Aviation and Financial Management from Louisiana Tech University.
              </Text>
            </ScrollView>
          </View>
        )}

        {/* Staff Directory Title & Table */}
        <Text style={localStyles.directoryTitle}>Staff Directory</Text>
        <View style={localStyles.tableContainer}>
          <View style={localStyles.tableRowHeader}>
            <View style={localStyles.tableCellHeader}><Text style={localStyles.tableHeaderText}>Name</Text></View>
            <View style={localStyles.tableCellHeader}><Text style={localStyles.tableHeaderText}>Position</Text></View>
          </View>
          {[
            { name: 'Art Crisco', position: 'President/CEO', email: 'artc@behindthewalls.com' },
            { name: 'Barbara Brown', position: 'Executive Assistant', email: 'barbarab@behindthewalls.com' },
            { name: 'Cathy McCauley', position: 'CEO Assistant', email: 'ceoassist@behindthewalls.com' },
            { name: 'Dan Coughlin', position: 'Director of Development', email: 'danc@behindthewalls.com' },
            { name: 'Derek Gaskins', position: 'Director of Operations', email: 'DerekG@behindthewalls.com' },
            { name: 'Jay McCauley', position: 'Director of Communications', email: 'jaym@behindthewalls.com' },
            { name: 'Jeff Smith', position: 'Director of Ministry Programs', email: 'jeffs@behindthewalls.com' },
            { name: 'Kayleen Coughlin', position: 'Ministry Assistant', email: 'kayleenc@behindthewalls.com' },
            { name: 'Ken Taylor', position: 'Director of Church Relations', email: 'KenT@behindthewalls.com' },
            { name: 'Kit Vining', position: 'Director of Volunteer Engagement', email: 'KitV@behindthewalls.com' },
            { name: 'Mackenzie Brown', position: 'Ministry Assistant', email: 'mackenzieb@behindthewalls.co' },
            { name: 'Rick Waggoner', position: 'Director of Training', email: 'RickW@behindthewalls.com' },
            { name: 'Ronda Taylor', position: 'Ministry Assistant', email: 'RondaT@behindthewalls.com' },
            { name: 'Santo Garofalo', position: 'Director of Store Operations', email: 'santo@behindthewalls.com' },
            { name: 'Steve Kersh', position: 'Director of Media', email: 'stevek@behindthewalls.com' },
            { name: 'Terry Woodlin', position: 'Director of Equipping Volunteers', email: 'twoodlin@behindthewalls.com' },
          ].map((staff, i) => (
            <View
              key={staff.name}
              style={[localStyles.tableRow, i % 2 === 1 && { backgroundColor: '#f5f5f5' }]}
            >
              <View style={localStyles.tableCell}>
                <Text
                  style={{ color: '#888', textDecorationLine: 'underline' }}
                  onPress={() => Linking.openURL(`mailto:${staff.email}`)}
                >
                  {staff.name}
                </Text>
              </View>
              <View style={localStyles.tableCell}><Text style={localStyles.tableCellText}>{staff.position}</Text></View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    paddingTop: 0,
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1e3a5f',
    marginBottom: 28,
    textAlign: 'center',
    paddingVertical: 20,
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '90%',
    justifyContent: 'flex-start',
  },
  staffImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#1e3a5f',
    backgroundColor: '#e3eaf5',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    color: '#1e3a5f',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subheader: {
    color: '#4fc3f7',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowContainer: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    width: '90%',
    backgroundColor: '#f4f8fc',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    color: '#1e3a5f',
    fontSize: 16,
    fontWeight: '500',
  },
  directoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginTop: 32,
    marginBottom: 18,
    textAlign: 'center',
  },
  tableContainer: {
    width: '94%',
    alignSelf: 'center',
    marginBottom: 32,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#e3eaf5',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d8e8',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  tableCellHeader: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: 15,
    color: '#222',
  },
});