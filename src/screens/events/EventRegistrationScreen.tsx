import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type R = RouteProp<RootStackParamList, 'Event Registration'>;

/**
 * Legacy route: older flows navigated here; the app now uses Evangelism Event Detail.
 */
export default function EventRegistrationScreen() {
  const route = useRoute<R>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = route.params?.eventId ?? '';

  useEffect(() => {
    navigation.replace('Evangelism Event Detail', { eventId });
  }, [navigation, eventId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#1e3a5f" />
    </View>
  );
}
