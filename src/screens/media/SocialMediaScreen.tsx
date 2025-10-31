import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function SocialMediaScreen() {
  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Follow Us on Social Media</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/socialmedia.jpg')} 
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.yellowLine} />
        </View>
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => handleSocialPress('https://www.facebook.com/BillGlassBehindTheWalls/')}
          >
            <FontAwesome5 name="facebook" size={40} color="#1e3a5f" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => handleSocialPress('https://twitter.com/bgbtw')}
          >
            <FontAwesome5 name="twitter" size={40} color="#1e3a5f" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => handleSocialPress('https://instagram.com/Bgbtw')}
          >
            <FontAwesome5 name="instagram" size={40} color="#1e3a5f" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => handleSocialPress('https://linkedin.com/company/BillGlassBTW')}
          >
            <FontAwesome5 name="linkedin" size={40} color="#1e3a5f" />
          </TouchableOpacity>
          
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleSocialPress('https://www.threads.net/@bgbtw')}
            >
              <FontAwesome5 name="threads" size={40} color="#1e3a5f" />
            </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => handleSocialPress('https://youtube.com/@bgbtw')}
          >
            <FontAwesome5 name="youtube" size={40} color="#1e3a5f" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 400,
    borderRadius: 8,
  },
  yellowLine: {
    width: '60%',
    height: 4,
    backgroundColor: '#FFD700',
    marginTop: 15,
    borderRadius: 2,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    width: 60,
    height: 60,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: { 
    fontSize: 20,
    color: '#666',
  }
});
