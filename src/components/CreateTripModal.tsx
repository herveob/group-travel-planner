
import { FC, useState } from 'react';
import { View, Pressable, Text, Modal, TextInput, Alert } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import MemberCategoryCheckBox from './MemberCategoryCheckbox';
import { CreateTripModalProps } from '../types/CreateTripModal.types';
import { createTrip } from '../services/trips/createTrip';

const currentUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
}

const CreateTripModal: FC<CreateTripModalProps> = ({ modalVisible, setModalVisible, setTrips, trips }) => {
  const [createTripTile, setCreateTripTile] = useState('');

  const resetStates = () => {
    setCreateTripTile('');
  };

  const handleCreateMember = async () => {
    if (createTripTile === '') {
      return alert('Please fill in the fields')
    }
    else {
      const startDate = moment().format('DD/MM/YY').toLocaleString();
      const endDate = moment().add(7, 'days').format('DD/MM/YY').toLocaleString();

      console.log({ startDate, endDate });
      // const newTrip = await createTrip({
      //     id: uuidv4(),
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View >
        <View >
          <Text >Create new trip</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setCreateTripTile(text)}
            placeholder='Title'
          />
          <View >
            <Pressable
              onPress={() => handleCreateMember()}>
              <Text >Create</Text>
            </Pressable>
            <Pressable

              onPress={() => setModalVisible(!modalVisible)}>
              <Text >Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTripModal;