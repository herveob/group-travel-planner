import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { navBottomNavigatorHeight } from '../helpers/constants';
import Header from '../components/Header';

const Settings = () => {
  return (
    <SafeAreaView style={
      {
        flex: 1,
        paddingBottom: navBottomNavigatorHeight,
        alignItems: 'center',
      }
    }>
      <Header label={'Group Travel Planner'} />

      <Text>Settings</Text>
    </SafeAreaView>
  )
}

export default Settings;