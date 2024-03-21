import React from 'react'
import { SafeAreaView } from 'react-native'
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

      <div>Settings</div>
    </SafeAreaView>
  )
}

export default Settings;