import { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Modal, TextInput } from 'react-native';
import Proptypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';

import MemberCategoryCheckBox from './MemberCategoryCheckbox';

const EditMemberModal = ({ modalVisible, setModalVisible, setMembers, members, currentEditMember, setCurrentEditMember }) => {
  console.log({ currentEditMember })
  const [editMemberFirstName, setEditMemberFirstName] = useState(currentEditMember.firstName);
  const [editMemberLastName, setEditMemberLastName] = useState(currentEditMember.lastName);
  const [editMemberCategories, setEditMemberCategories] = useState(currentEditMember.categories);
  const handleEditMember = () => {
    if (editMemberFirstName === '') {
      return alert('Please fill in the fields')
    }
    else {
      const currentEditMemberIndex = members.findIndex(member => member.id === currentEditMember.id);
      const editedMember = members.find(member => member.id === currentEditMember.id);
      editedMember.firstName = editMemberFirstName;
      editedMember.lastName = editMemberLastName;
      editedMember.categories = editMemberCategories;
      const newMembers = members;
      newMembers.splice(currentEditMemberIndex, 1, editedMember);

      setMembers(newMembers);
      setModalVisible(!modalVisible);
      setCurrentEditMember(null);
      setEditMemberCategories([]);
    }
  }

  const handleDeleteUser = () => {
    const newMembers = members.filter(member => member.id !== currentEditMember.id);
    setMembers(newMembers);
    setModalVisible(!modalVisible);
  };

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
          <Text style={styles.modalText}>Edit member</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setEditMemberFirstName(text)}
            placeholder={currentEditMember.firstName}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setEditMemberLastName(text)}
            placeholder={currentEditMember.lastName}
          />
          <MemberCategoryCheckBox createMemberCategories={editMemberCategories} setCreateMemberCategories={setEditMemberCategories} />
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.buttonEdit]}
              onPress={() => handleEditMember()}>
              <Text style={styles.textStyle}>Edit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.deleteUserButton}
              onPress={() => handleDeleteUser()}>
              <AntDesign name="deleteuser" size={24} color="red" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

EditMemberModal.propTypes = {
  modalVisible: Proptypes.bool,
  setModalVisible: Proptypes.func.isRequired,
  setMembers: Proptypes.func.isRequired,
  setCurrentEditMember: Proptypes.func.isRequired,
  members: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      firstName: Proptypes.string.isRequired,
      lastName: Proptypes.string.isRequired,
      categories: Proptypes.arrayOf(Proptypes.oneOf(['snowboard', 'ski'])).isRequired,
    })
  ).isRequired,
  currentEditMember: Proptypes.shape({
    id: Proptypes.string.isRequired,
    firstName: Proptypes.string.isRequired,
    lastName: Proptypes.string.isRequired,
    categories: Proptypes.arrayOf(Proptypes.oneOf(['snowboard', 'ski'])).isRequired,
  }).isRequired,

};

EditMemberModal.defaultProps = {
  modalVisible: false,
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
      width: scale(0),
      height: scale(2),
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
  buttonEdit: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  deleteUserButton: {
    marginTop: scale(20),
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

export default EditMemberModal;