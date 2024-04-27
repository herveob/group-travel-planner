
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, withTheme, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { createTrip } from '../services/trips';
import useFirebaseAuth from '../database/useFirebaseAuth';
import { Trip } from '../types/Trip';
import { scale } from 'react-native-size-matters';
import DateRangePicker, { Range } from './DateRangePicker';

type CreateTripModalProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setTrips: Dispatch<SetStateAction<Trip[]>>;
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
  const [range, setRange] = useState<Range>({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = useState(false);
  const [createTripTitle, setCreateTripTitle] = useState('');

  useEffect(() => {
    console.log({ range });
  }, [range]);

  const resetStates = () => {
    setCreateTripTitle('');
  };

  const handleCreateMember = async () => {
    if (createTripTitle === '') {
      return alert('Please fill in the fields')
    }
    else {
      const locale = 'fr-FR';
      const timeZone = 'UTC';
      const startDate = range.startDate?.toLocaleString(locale, { timeZone });
      const endDate = range.endDate?.toLocaleString(locale, { timeZone });

      if (startDate && endDate && userId) {
        const newTrip = await createTrip({
          id: uuidv4(),
          title: createTripTitle,
          startDate,
          endDate,
          ownerId: userId,
          members: [],
        });
        setTrips([...trips, newTrip])
        setModalVisible(!modalVisible)
        resetStates();
      }
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
        <DateRangePicker range={range} setRange={setRange} open={open} setOpen={setOpen} />
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