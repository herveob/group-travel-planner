import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, withTheme, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { scale } from 'react-native-size-matters';

import MemberCategoryCheckBox from './MemberCategoryCheckbox';
import { category } from '../types/MemberCategoryCheckBox.types';
import { createMember } from '../services/members';
import { Member } from '../types/Member.types';

type CreateMemberModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  members: Member[];
  theme: MD3Theme;
};


const CreateMemberModal: FC<CreateMemberModalProps> = ({ modalVisible, setModalVisible, setMembers, members, theme }) => {
  const [createMemberFirstName, setCreateMemberFirstName] = useState('');
  const [createMemberLastName, setCreateMemberLastName] = useState('');
  const [creteaMemberCategories, setCreateMemberCategories] = useState<category[]>([]);

  const resetStates = () => {
    setCreateMemberFirstName('');
    setCreateMemberLastName('');
    setCreateMemberCategories([]);
  };

  const handleCreateMember = async () => {
    if (createMemberFirstName === '') {
      return alert('Please fill in the fields')
    }
    else {
      try {
        const newMember = await createMember({ id: uuidv4(), firstName: createMemberFirstName, lastName: createMemberLastName, categories: creteaMemberCategories });
        setMembers([...members, newMember])
        setModalVisible(false)
        resetStates();
      } catch (error) {
        console.log(error)
        alert('An error occurred while creating the member')
      }
    }
  };

  const handleCancel = () => {
    resetStates();
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 20,
      gap: scale(5),
    },
  });

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
          resetStates();
          setModalVisible(false);
        }}>
        <Text variant='displaySmall' style={{ textAlign: 'center' }}>Add a new member</Text>
        <TextInput
          value={createMemberFirstName}
          onChangeText={text => setCreateMemberFirstName(text)}
          placeholder='First name'
        />
        <TextInput
          value={createMemberLastName}
          onChangeText={text => setCreateMemberLastName(text)}
          placeholder='Last name'
        />
        <MemberCategoryCheckBox createMemberCategories={creteaMemberCategories} setCreateMemberCategories={setCreateMemberCategories} />
        <View style={styles.modalButtonContainer}>
          <Button
            icon='account-plus' mode='contained'
            onPress={handleCreateMember}
            buttonColor={theme.colors.primary}>
            {'Create new member'}
          </Button>
          <Button icon='cancel' mode='contained' onPress={handleCancel} buttonColor={theme.colors.tertiary}>
            {'Cancel'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default withTheme(CreateMemberModal);