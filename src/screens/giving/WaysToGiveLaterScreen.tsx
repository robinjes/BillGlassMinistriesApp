import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WaysToGiveLaterScreen() {
  const navigation = useNavigation<any>();
  const [isLifeInsuranceOpen, setIsLifeInsuranceOpen] = useState(false);
  const [isRetirementOpen, setIsRetirementOpen] = useState(false);
  const [isAnnuityOpen, setIsAnnuityOpen] = useState(false);
  const [isPodTodOpen, setIsPodTodOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ways to Give Later</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderText}>Bequests Through Your Will</Text>
        
        <Text style={styles.bodyText}>
          Having a will is an important step in stewarding the resources God has given you. Not only does it provide for your loved ones and protect your estate, it also allows you to leave a legacy of generosity by giving a portion of your estate to the causes you care about. Bill Glass Behind the Walls has a simple and completely FREE will creation tool from FreeWill.com. With it you can create:
        </Text>
        
        <Text style={styles.bulletText}>• Last Will and Testament</Text>
        <Text style={styles.bulletText}>• Revocable Living Trust</Text>
        <Text style={styles.bulletText}>• Beneficiary Designations</Text>
        <Text style={styles.bulletText}>• Advanced Healthcare Directive</Text>
        <Text style={styles.bulletText}>• Financial Power of Attorney</Text>
        <Text style={styles.bulletText}>• Funeral Instructions</Text>
        
        <Text style={styles.bodyText}>
          And so much more. Click the button below to get started.
        </Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Click Here to Get Started</Text>
        </TouchableOpacity>
        
        {/* Life Insurance Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsLifeInsuranceOpen(!isLifeInsuranceOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Life Insurance</Text>
          <Text style={styles.dropdownChevron}>{isLifeInsuranceOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isLifeInsuranceOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.bodyText}>
              Listing Bill Glass Behind the Walls as a beneficiary on your life insurance is an easy and flexible way to support our ministry. Simply complete a change of beneficiary form with your insurance company naming Bill Glass Behind the Walls as a beneficiary.
            </Text>
          </View>
        )}
        
        {/* Retirement Accounts Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsRetirementOpen(!isRetirementOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Retirement Accounts</Text>
          <Text style={styles.dropdownChevron}>{isRetirementOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isRetirementOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.bodyText}>
              Retirement accounts, such as IRAs, 401(k), and 403(b) plans can be used to leave a legacy. By updating your beneficiary designations, you can name Bill Glass Behind the Walls as the beneficiary of some or all of a retirement account. These assets will transfer tax-free.
            </Text>
          </View>
        )}
        
        {/* Charitable Annuity or Trust Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsAnnuityOpen(!isAnnuityOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Charitable Annuity or Trust</Text>
          <Text style={styles.dropdownChevron}>{isAnnuityOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isAnnuityOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.bodyText}>
              An annuity or trust can provide flexibility in your estate plan. It can be arranged to provide income in your retirement years or provide for your family while your gift grows.
            </Text>
          </View>
        )}
        
        {/* POD and TOD Accounts Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsPodTodOpen(!isPodTodOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Payable on Death (POD) and Transfer on Death (TOD) Accounts</Text>
          <Text style={styles.dropdownChevron}>{isPodTodOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isPodTodOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.bodyText}>
              You can gift your bank accounts or brokerage/investment accounts by naming Bill Glass Behind the Walls as payee or transferee upon death. This type of gift transfers tax-free and outside of probate.
            </Text>
          </View>
        )}
        
        {/* How Can We Help Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsHelpOpen(!isHelpOpen)}
        >
          <Text style={styles.dropdownHeaderText}>How Can We Help</Text>
          <Text style={styles.dropdownChevron}>{isHelpOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isHelpOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.bodyText}>
              If you need assistance, please call us at (972) 298-1101 or{' '}
              <Text 
                style={styles.linkText} 
                onPress={() => navigation.navigate('Ways to Give Contact Form')}
              >
                complete this form
              </Text>
              {' '}to request an email reply.
            </Text>
          </View>
        )}
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
  },
  subheaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 15,
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    flex: 1,
  },
  dropdownChevron: {
    fontSize: 14,
    color: '#1e3a5f',
    fontWeight: 'bold',
  },
  dropdownContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  linkText: {
    color: '#1e3a5f',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});
