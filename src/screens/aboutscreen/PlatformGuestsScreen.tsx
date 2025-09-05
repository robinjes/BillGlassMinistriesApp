
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function PlatformGuestsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const slideshowImages = [
    require('../../../assets/slideshow/1 (1).png'),
    require('../../../assets/slideshow/1 (2).png'),
    require('../../../assets/slideshow/1 (3).png'),
    require('../../../assets/slideshow/1 (4).png'),
    require('../../../assets/slideshow/1 (5).png'),
    require('../../../assets/slideshow/1 (6).png'),
    require('../../../assets/slideshow/1 (7).png'),
    require('../../../assets/slideshow/1 (8).png'),
    require('../../../assets/slideshow/1 (9).png'),
    require('../../../assets/slideshow/1 (10).png'),
    require('../../../assets/slideshow/1 (11).png'),
    require('../../../assets/slideshow/1 (12).png'),
    require('../../../assets/slideshow/1 (13).png'),
    require('../../../assets/slideshow/1 (14).png'),
    require('../../../assets/slideshow/1 (15).png'),
    require('../../../assets/slideshow/1 (16).png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
      setShowArrows(false);
    }, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideshowImages.length - 1 : prev - 1));
    setShowArrows(true);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    setShowArrows(true);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Platform Guests</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>
          Our professionally staged events feature athletes, entertainers, musicians, and ex-offenders sharing their talents and the stories how they came to faith in Jesus Christ. Our performers draw the inmates and juvenile offenders out to the program who typically wouldn’t attend a church or chapel service. And, they do this by offering hope; which, opens the door for our volunteers to share their faith using our proven tract.
        </Text>
      </View>
      {/* Slideshow below all other content */}
      <View style={styles.slideshowContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideshowTouch}
          onPress={() => setShowArrows(true)}
        >
          <Image
            source={slideshowImages[currentIndex]}
            style={styles.slideshowImage}
            resizeMode="cover"
          />
          {showArrows && (
            <>
              <TouchableOpacity style={styles.arrowLeft} onPress={goToPrev}>
                <Text style={styles.arrowText}>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowRight} onPress={goToNext}>
                <Text style={styles.arrowText}>{'>'}</Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
      </View>
      {/* Centered call-to-action text and link below slideshow */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>
          Do you know someone who would be a good Platform Guest?{"\n"}
          Send us their information and we will check them out.
        </Text>
        <Text style={styles.ctaText}>{"\n"}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PlatformGuestForm')}>
          <Text style={styles.ctaLink}>Fill out this form.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ctaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  ctaText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#1e3a5f',
    marginBottom: 4,
  },
  ctaLink: {
    color: '#4fc3f7',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  // ...existing code...
  slideshowContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
    position: 'relative',
  },
  slideshowTouch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  slideshowImage: {
    width: 340,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: 'rgba(30,58,95,0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: 'rgba(30,58,95,0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  arrowText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 32,
  },
  bodyText: {
    fontSize: 17,
    color: '#222',
    lineHeight: 24,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    minHeight: 700,
    paddingBottom: 32,
  },
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
  text: { fontSize: 20 }
});
