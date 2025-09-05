import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function EventsScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Redirect to Evangelism Events as the main events page
    navigation.navigate('Evangelism Events');
  }, [navigation]);

  return null;
}
