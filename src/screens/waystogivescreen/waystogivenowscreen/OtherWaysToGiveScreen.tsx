import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function OtherWaysToGiveScreen() {
  const [airlineMilesOpen, setAirlineMilesOpen] = useState(false);
  const [workplaceGivingOpen, setWorkplaceGivingOpen] = useState(false);

  const handleEmailPress = () => {
    Linking.openURL('mailto:RondaT@behindthewalls.com');
  };

  const giftCards = [
    {
      id: 1,
      icon: 'trending-up',
      iconType: 'Ionicons',
      title: 'Stocks and securities',
      description: 'Many people love donating stock or mutual funds because it may help them avoid paying capital gains taxes.',
    },
    {
      id: 2,
      icon: 'favorite',
      iconType: 'MaterialIcons',
      title: 'Donor Advised Funds',
      description: 'Easily recommend grants to Bill Glass Behind the Walls for tax-efficient giving.',
    },
    {
      id: 3,
      icon: 'bitcoin',
      iconType: 'FontAwesome5',
      title: 'Cryptocurrency',
      description: 'Donate Bitcoin, Ethereum, and more to save on taxes and make a big impact.',
    },
    {
      id: 4,
      icon: 'account-balance',
      iconType: 'MaterialIcons',
      title: 'Qualified Charitable Distributions',
      description: 'Use your IRA to make tax-free gifts that benefit you and our mission.',
    },
    {
      id: 5,
      icon: 'home',
      iconType: 'MaterialIcons',
      title: 'Real Estate',
      description: 'Donate real estate to make a lasting impact, unlocking the hidden potential of your property\'s value.',
    },
    {
      id: 6,
      icon: 'home-work',
      iconType: 'MaterialIcons',
      title: 'Retained Life Estate',
      description: 'Secure your home\'s future through a Retained Life Estate, ensuring support for us while residing in your property.',
    },
  ];

  const renderIcon = (iconType: string, iconName: string) => {
    const iconProps = { size: 24, color: '#4A90E2' };
    
    switch (iconType) {
      case 'Ionicons':
        return <Ionicons name={iconName as any} {...iconProps} />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName as any} {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName as any} {...iconProps} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName as any} {...iconProps} />;
      default:
        return <MaterialIcons name={iconName as any} {...iconProps} />;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Other Ways to Give</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Popular Tax-Smart Gifts</Text>
        
        <View style={styles.cardsGrid}>
          {giftCards.map((card) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.cardIcon}>
                {renderIcon(card.iconType, card.icon)}
              </View>
              <Text style={[styles.cardTitle, card.title === 'Cryptocurrency' && styles.smallCardTitle]}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn more</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={styles.dropdownSection}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={[styles.dropdownHeader, airlineMilesOpen && styles.dropdownHeaderOpen]}
              onPress={() => setAirlineMilesOpen(!airlineMilesOpen)}
            >
              <Text style={styles.dropdownHeaderText}>Airline Miles</Text>
              <Text style={styles.dropdownChevron}>{airlineMilesOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {airlineMilesOpen && (
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownDescription}>
                  If you are a frequent air traveler, you may have accumulated more travel miles than you are able to use. If so, please consider donating your extra miles to the ministry. Because we conduct events nationwide, it is often necessary to fly our platform speakers to these events. A bank of airline miles helps us to minimize our expenses. For more information, please contact Ronda Taylor at 972-298-1101 or click the button below to email us.
                </Text>
                <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
                  <Text style={styles.emailButtonText}>Email Us</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={[styles.dropdownHeader, workplaceGivingOpen && styles.dropdownHeaderOpen]}
              onPress={() => setWorkplaceGivingOpen(!workplaceGivingOpen)}
            >
              <Text style={styles.dropdownHeaderText}>Workplace Giving</Text>
              <Text style={styles.dropdownChevron}>{workplaceGivingOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {workplaceGivingOpen && (
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownDescription}>
                  Many companies set aside funds to support nonprofit charities. Your company may have a matching gift program that could multiply your gift to Behind the Walls. You may be able to participate even if you are a retiree. In addition, many places of employment (including certain government agencies) conduct workplace charitable fund drives through which you might be able to give to us. Contact your employer to see if they have such programs. We will gladly assist with any paperwork required of us.
                </Text>
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  smallCardTitle: {
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  learnMoreButton: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  learnMoreText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  dropdownSection: {
    marginTop: 30,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  dropdownHeaderOpen: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownContent: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dropdownDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  },
  emailButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
  },
  emailButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownChevron: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  }
});
