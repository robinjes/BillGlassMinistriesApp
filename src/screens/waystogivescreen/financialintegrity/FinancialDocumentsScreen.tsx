import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function FinancialDocumentsScreen() {
  const handleDocumentPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderText}>BILL GLASS BEHIND THE WALLS FINANCIAL DOCUMENTS</Text>
        
        <TouchableOpacity onPress={() => handleDocumentPress('https://irp.cdn-website.com/cb495078/files/uploaded/2024_Ministry_Report.pdf')}>
          <Text style={styles.documentText}>2024 Ministry Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleDocumentPress('https://irp.cdn-website.com/cb495078/files/uploaded/2024AuditFinancialStatements-BillGlassMinistries.pdf')}>
          <Text style={styles.documentText}>2024 Audited Financial Statements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleDocumentPress('https://irp.cdn-website.com/cb495078/files/uploaded/2024Form990-BillGlassMinistries.pdf')}>
          <Text style={styles.documentText}>2024 IRS Form 990</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleDocumentPress('https://irp.cdn-website.com/cb495078/files/uploaded/190301-IRS%20501C3%20Bill%20Glass%20Ministries%20dba%20Bill%20Glass%20Behind%20the%20Walls.pdf')}>
          <Text style={styles.documentText}>IRS Tax Exemption Letter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subheaderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
    marginBottom: 40,
    textAlign: 'left',
  },
  documentText: {
    fontSize: 22,
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'left',
    paddingLeft: 10,
    textDecorationLine: 'underline',
  }
});
