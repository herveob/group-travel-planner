import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, withTheme, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';

import MemberCategoryCheckBox from './MemberCategoryCheckbox';
import { deleteMember, updateMember } from '../services/members';
import { Member } from '../types/Member.types';
import { scale } from 'react-native-size-matters';

type EditMembersModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setMembers: (members: Member[]) => void;
  setCurrentEditMember: (member: Member | null) => void;
  members: Member[];
  currentEditMember: Member;
  theme: MD3Theme
};

const EditMemberModal: FC<EditMembersModalProps> = ({ modalVisible, setModalVisible, setMembers, members, currentEditMember, setCurrentEditMember, theme }) => {
  const styles = StyleSheet.create({
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 20,
      gap: scale(5),
    },
  });

  const [editMemberFirstName, setEditMemberFirstName] = useState(currentEditMember.firstName);
  const [editMemberLastName, setEditMemberLastName] = useState(currentEditMember.lastName);
  const [editMemberCategories, setEditMemberCategories] = useState(currentEditMember.categories);

  const handleEditMember = async () => {
    if (editMemberFirstName === '') {
      return alert('Please fill in the fields');
    }
    else {
      const currentEditMemberIndex = members.findIndex(member => member.id === currentEditMember.id);
      const editedMember = members.find(member => member.id === currentEditMember.id);
      if (editedMember !== undefined) {
        editedMember.firstName = editMemberFirstName;
        editedMember.lastName = editMemberLastName;
        editedMember.categories = editMemberCategories;
        const newMembers = members;
        newMembers.splice(currentEditMemberIndex, 1, editedMember);
        try {
          await updateMember(editedMember);
          setMembers(newMembers);
          setModalVisible(!modalVisible);
          setCurrentEditMember(null);
          setEditMemberCategories([]);
        } catch (error) {
          console.log(error)
          alert('An error occurred while updating the member');
        }
      }
    }
  }

  const handleCancel = () => {
    setModalVisible(false);
    setCurrentEditMember(null);
  };


  const handleDeleteMember = async () => {
    await deleteMember(currentEditMember.id);
    const newMembers = members.filter(member => member.id !== currentEditMember.id);
    setMembers(newMembers);
    setModalVisible(!modalVisible);
    setCurrentEditMember(null);
  };

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
          handleCancel();
        }}>
        <Text variant='displaySmall' style={{ textAlign: 'center' }}>Edit member</Text>
        <TextInput
          value={editMemberFirstName}
          onChangeText={text => setEditMemberFirstName(text)}
          placeholder={currentEditMember.firstName}
        />
        <TextInput
          value={editMemberLastName}
          onChangeText={text => setEditMemberLastName(text)}
          placeholder={currentEditMember.lastName}
        />
        <MemberCategoryCheckBox createMemberCategories={editMemberCategories} setCreateMemberCategories={setEditMemberCategories} />
        <View style={styles.modalButtonContainer}>
          <Button
            icon={'account-edit'}
            mode={'contained'}
            onPress={handleEditMember}>
            {'Edit'}
          </Button>
          <Button
            buttonColor={theme.colors.tertiary}
            icon={'cancel'}
            mode={'contained'}
            onPress={handleCancel}>
            {'Cancel'}
          </Button>
        </View>
        <View>
          <Button
            buttonColor={theme.colors.error}
            icon={'delete'}
            mode={'contained'}
            onLongPress={() => handleDeleteMember()}
          >
            {'Delete this member'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};


export default withTheme(EditMemberModal);