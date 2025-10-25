import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';

export default function WhoIsBillGlassCardsScreen() {
  const handleDownload = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Who is Bill Glass? Cards</Text>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          The Who is Bill Glass? card is a comprehensive, compact promotional explanation of Bill Glass Ministries. It is great for recruiting people, pastors, and donors. There are three versions that use different front pictures with the same information on the back. Click on the pictures below to download the PDF versions of each one. You are welcome to forward and/or share any or all of the cards.
        </Text>
      </View>
      
      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D1.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d1.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D2.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d2.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D3.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d3.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D4.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d4.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D5.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d5.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cardBox}
          onPress={() => handleDownload('https://irp.cdn-website.com/cb495078/files/uploaded/Who_is_Bill_Glass-D6.pdf')}
        >
          <Image 
            source={require('../../../assets/cards/d6.jpg')} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.text}></Text>
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
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#fff',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  cardBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 0,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '100%',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  text: { 
    fontSize: 20,
    color: '#666',
  }
});
