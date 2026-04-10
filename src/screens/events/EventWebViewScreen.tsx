import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../../navigation/AppNavigator';

/** Helps Vimeo and similar embeds load in WKWebView instead of showing “having a little trouble.” */
const WEBVIEW_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

type Props = RouteProp<RootStackParamList, 'Event WebView'>;

export default function EventWebViewScreen() {
  const { params } = useRoute<Props>();
  const navigation = useNavigation();
  const { url, title, headerStyle = 'default' } = params;

  const renderToolbar = () => {
    if (headerStyle === 'navy' && title) {
      return (
        <View style={navyStyles.headerContainer}>
          <Text style={navyStyles.headerText} numberOfLines={3}>
            {title}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        {title ? (
          <Text style={styles.toolbarTitle} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderToolbar()}
      <WebView
        source={{
          uri: url,
          headers: {
            Referer: 'https://www.behindthewalls.com/',
          },
        }}
        userAgent={WEBVIEW_USER_AGENT}
        style={styles.webview}
        startInLoadingState
        setSupportMultipleWindows={false}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        nestedScrollEnabled
        {...(Platform.OS === 'android' ? { androidLayerType: 'hardware' as const } : {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    gap: 12,
  },
  backBtn: { paddingVertical: 6, paddingRight: 8 },
  backText: { fontSize: 16, color: '#1e3a5f', fontWeight: '600' },
  toolbarTitle: { flex: 1, fontSize: 15, color: '#1e3a5f', fontWeight: '600', textAlign: 'center' },
  webview: { flex: 1 },
});

/** Same values as GreatestNeedSupportScreen headerContainer + headerText */
const navyStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 20,
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
});
