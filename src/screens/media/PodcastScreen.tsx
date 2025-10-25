import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

export default function PodcastScreen() {
  const [booksExpanded, setBooksExpanded] = useState(false);
  const [focusExpanded, setFocusExpanded] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>The Power of a Father's Blessing Podcast</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.imagePlayerContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/podcast/powerofafathersblessing.jpg')} 
              style={styles.podcastImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.playerContainer}>
            <WebView
              source={{ uri: 'https://www.podbean.com/player-v2/?i=a77x4-13d57af-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=3267a3&size=315' }}
              style={styles.webView}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.podcastDescription}>
            <Text style={styles.podcastTitleInline}>The Power of a Father's Blessing</Text> is a faith-based interview podcast exploring the powerful role of fathers—for better or worse. Through honest conversations and personal stories, we examine how fatherhood shapes identity, faith, and future generations. Whether the father was present, absent, loving, or broken, these stories reveal both wounds and redemption. Our goal is to inspire fathers to engage, equip the Church to stand in the gap, and ultimately point every heart to the perfect love of our Heavenly Father—who restores, redeems, and never fails.
          </Text>
          
          <View style={styles.buttonsContainer}>
            <View style={styles.topButtonsRow}>
              <TouchableOpacity style={styles.platformButton} onPress={() => Linking.openURL('https://open.spotify.com/show/5yD9Ne4MwZDyBkSwKGS8fg?si=f2be4d3a615747a7')}>
                <MaterialIcons name="music-note" size={24} color="#1DB954" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Spotify Podcasts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.platformButton} onPress={() => Linking.openURL('https://podcasts.apple.com/us/podcast/the-power-of-a-fathers-blessing/id1821746812')}>
                <AntDesign name="apple" size={24} color="#000000" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Apple Podcasts</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomButtonRow}>
              <TouchableOpacity style={styles.platformButton} onPress={() => Linking.openURL('https://youtube.com/playlist?list=PLaLm0r7Nww3aSy_OQCVRmin3LDlUV-qgV&feature=shared')}>
                <AntDesign name="youtube" size={24} color="#FF0000" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>YouTube Podcasts</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.fatherhoodResourcesContainer}>
            <Text style={styles.fatherhoodResourcesTitle}>Fatherhood Resources</Text>
          </View>
          
          {/* Books Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dropdownHeader} 
              onPress={() => setBooksExpanded(!booksExpanded)}
            >
              <Text style={styles.dropdownTitle}>Books</Text>
              <MaterialIcons 
                name={booksExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#1e3a5f" 
              />
            </TouchableOpacity>
            {booksExpanded && (
              <View style={styles.dropdownContent}>
                <View style={styles.bookContentContainer}>
                  <View style={styles.bookImageContainer}>
                    <Image 
                      source={require('../../../assets/podcast/championsbook.jpg')} 
                      style={styles.bookImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.bookTextContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.amazon.com/Champions-Life-Power-Fathers-Blessing/dp/0757302505')}>
                      <Text style={styles.bookTitle}>Champions For Life: The Power Of A Father's Blessing</Text>
                    </TouchableOpacity>
                    <Text style={styles.bookDescription}>
                      Bill Glass, founder of Champions for Life, one of the most respected ministries in the country, shares the powerful message he has been preaching for decades: the most important thing a father can do is to bless his child. Through his personal stories and teachings, Glass shows all parents how a blessing can give children the inspiration, reassurance and confidence to live life to their fullest potential
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          
          {/* Focus on the Family Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dropdownHeader} 
              onPress={() => setFocusExpanded(!focusExpanded)}
            >
              <Text style={styles.dropdownTitle}>Focus on the Family</Text>
              <MaterialIcons 
                name={focusExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#1e3a5f" 
              />
            </TouchableOpacity>
            {focusExpanded && (
              <View style={styles.dropdownContent}>
                <View style={styles.focusImageContainer}>
                  <Image 
                    source={require('../../../assets/podcast/focusfamily.jpg')} 
                    style={styles.focusImage}
                    resizeMode="cover"
                  />
                </View>
                
                <View style={styles.focusContentContainer}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.focusonthefamily.com/age-and-stage-super-dad/')}>
                    <Text style={styles.focusSubheader}>Resources for Dads</Text>
                  </TouchableOpacity>
                  <Text style={styles.focusDescription}>
                    Age & Stage: Match your parenting to your kid's needs. Genuine Love + Wise, Christ-centered Guidance = Superpower Dad! This is a place to get easy-to-access, practical content to help you win at your most important role.
                  </Text>
                  
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.focusonthefamily.com/parenting/fatherhood-how-to-be-the-dad-your-family-needs/')}>
                    <Text style={styles.focusSubheader}>Download your Dad Report Card</Text>
                  </TouchableOpacity>
                  <Text style={styles.focusDescription}>
                    Explore an important opportunity to receive critical feedback from your kids about how they view you. Our report card is broken up into a few key categories: spending time together, activities, support, mentoring, and spiritual leadership. Once you complete your Report Card, engage in more fatherhood content to build on areas of strength and weakness.
                  </Text>
                </View>
              </View>
            )}
          </View>
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
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  imagePlayerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 30,
  },
  imageContainer: {
    flex: 0,
    width: 200,
    height: 200,
  },
  podcastImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerContainer: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  descriptionContainer: {
    width: '100%',
  },
  podcastTitleInline: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#1e3a5f',
  },
  podcastDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 15,
  },
  buttonsContainer: {
    marginTop: 5,
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  bottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 100,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a5f',
  },
  fatherhoodResourcesContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  fatherhoodResourcesTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a5f',
    textAlign: 'left',
  },
  dropdownContainer: {
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  dropdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  dropdownContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  dropdownText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  bookContentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  bookImageContainer: {
    flex: 0,
    width: 120,
    height: 160,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookTextContainer: {
    flex: 1,
    paddingTop: 5,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  bookDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'left',
  },
  focusImageContainer: {
    width: '100%',
    height: 80,
    marginBottom: 12,
  },
  focusImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  focusContentContainer: {
    width: '100%',
  },
  focusSubheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 8,
    marginTop: 20,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  focusDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 15,
  }
});
