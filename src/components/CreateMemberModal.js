import { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Modal, TextInput } from 'react-native';
import Proptypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { scale } from 'react-native-size-matters';

import MemberCategoryCheckBox from './MemberCategoryCheckbox';

const CreateMemberModal = ({ modalVisible, setModalVisible, setMembers, members }) => {
  const [createMemberFirstName, setCreateMemberFirstName] = useState('');
  const [createMemberLastName, setCreateMemberLastName] = useState('');
  const [creteaMemberCategories, setCreateMemberCategories] = useState([]);
  const handleCreateMember = () => {
    if (createMemberFirstName === '') {
      return alert('Please fill in the fields')
    }
    else {
      setMembers([...members, { id: uuidv4(), firstName: createMemberFirstName, lastName: createMemberLastName, categories: creteaMemberCategories}])
      setModalVisible(!modalVisible)
      setCreateMemberCategories([]);
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a new member</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setCreateMemberFirstName(text)}
            placeholder='First name'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setCreateMemberLastName(text)}
            placeholder='Last name'
          />
          <MemberCategoryCheckBox createMemberCategories={creteaMemberCategories} setCreateMemberCategories={setCreateMemberCategories}/>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={() => handleCreateMember()}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

CreateMemberModal.propTypes = {
  modalVisible: Proptypes.bool,
  setModalVisible: Proptypes.func.isRequired,
  setMembers: Proptypes.func.isRequired,
  members: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      firstName: Proptypes.string.isRequired,
      lastName: Proptypes.string.isRequired,
      categories: Proptypes.arrayOf(Proptypes.oneOf(['snowboard', 'ski'])).isRequired,
    })
  ),
};

CreateMemberModal.defaultProps = {
  modalVisible: false,
  members: [],
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(22),
  },
  modalView: {
    margin: scale(20),
    backgroundColor: 'white',
    borderRadius: scale(20),
    padding: scale(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: scale(12),
    padding: scale(10),
    elevation: 2,
  },
  buttonCreate: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: scale(15),
    textAlign: 'center',
    fontSize: scale(25),
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(5),
  },
});

export default CreateMemberModal;