import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { withTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';

import getTrips from '../services/trips/getTrips';
import Header from '../components/Header';
import CreateTripModal from '../components/CreateTripModal';
import { navBottomNavigatorHeight } from '../helpers/constants';
import { Trip } from '../types/Trip';
import { styles } from '../styles/Home.styles';
const Home = ({ theme }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [createTripModalVisible, setCreateTripModalVisible] = useState(false);


  useEffect(() => {
    async function fetchTrips() {
      if (trips.length === 0) {
        const fetchedTrips = await getTrips();
        setTrips(fetchedTrips);
      }
    }
    fetchTrips()
  }, [])

  useEffect(() => {
    console.log({ trips })
  }, [trips])

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingBottom: navBottomNavigatorHeight,
    }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header label={'Group Travel Planner'} />
        <CreateTripModal modalVisible={createTripModalVisible} setModalVisible={setCreateTripModalVisible} setTrips={setTrips} trips={trips} />
        <View>
          <Button icon="wallet-travel" mode="contained" onPress={() => setCreateTripModalVisible(!createTripModalVisible)}>
            Create New trip project
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(Home);


