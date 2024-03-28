
import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, withTheme, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import moment from 'moment';

import { createTrip } from '../services/trips';
import useFirebaseAuth from '../database/useFirebaseAuth';
import { Trip } from '../types/Trip';
import { scale } from 'react-native-size-matters';

type CreateTripModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  trips: Trip[];
  theme: MD3Theme;
};

const currentUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
}

const CreateTripModal: FC<CreateTripModalProps> = ({ modalVisible, setModalVisible, setTrips, trips, theme }) => {
  const styles = StyleSheet.create({
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 20,
      gap: scale(5),
    },
  });

  const { user } = useFirebaseAuth();
  const userId = user?.uid;
  const [createTripTitle, setCreateTripTitle] = useState('');

  const resetStates = () => {
    setCreateTripTitle('');
  };

  const handleCreateMember = async () => {
    if (createTripTitle === '') {
      return alert('Please fill in the fields')
    }
    else {
      const startDate = moment().format('DD/MM/YY').toLocaleString();
      const endDate = moment().add(7, 'days').format('DD/MM/YY').toLocaleString();

      console.log({ startDate, endDate });
      // const newTrip = await createTrip({
      //     id: userId,
      //     startDate,
      //     endDate,
      //     ownerId: currentUser.id,
      //     members: [],
      // });
      // setTrips([...trips, newTrip])
      setModalVisible(!modalVisible)
      resetStates();
    }
  }

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        contentContainerStyle={{
          backgroundColor: theme.colors.secondaryContainer,
          padding: 20,
          margin: 20,
          borderRadius: 10,
        }}
        onDismiss={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Text variant='displaySmall' style={{ textAlign: 'center' }}>Create new trip</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
          onChangeText={text => setCreateTripTitle(text)}
          placeholder='Title'
        />
        <View style={styles.modalButtonContainer}>
          <Button
            icon={'wallet-travel'}
            mode={'contained'}
            onPress={handleCreateMember}>
            {'Create'}
          </Button>
          <Button
            buttonColor={theme.colors.tertiary}
            icon={'cancel'}
            mode={'contained'}
            onPress={() => setModalVisible(!modalVisible)}>
            {'Cancel'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default withTheme(CreateTripModal);