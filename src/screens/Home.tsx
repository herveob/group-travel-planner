import React, { useState, useEffect, FC } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { getTrips } from '../services/trips';
import Header from '../components/Header';
import CreateTripModal from '../components/CreateTripModal';
import { navBottomNavigatorHeight } from '../helpers/constants';
import { Trip } from '../types/Trip';

type HomeProps = {
  theme: MD3Theme;
};

const Home: FC<HomeProps> = ({ theme }) => {
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

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
});

export default withTheme(Home);


