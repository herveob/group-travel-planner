import { useState, useEffect, FC } from 'react';
import { View, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { Member } from '../types/Member.types';
import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../services/members';
import CreateMemberModal from '../components/CreateMemberModal';
import EditMemberModal from '../components/EditMemberModal';
import { navBottomNavigatorHeight } from '../helpers/constants';

type MemberListProps = {
  theme: MD3Theme;
};

const MemberList: FC<MemberListProps> = ({ theme }) => {
  const tripTitle = 'Trip to ValThorens';
  const [members, setMembers] = useState<Member[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState<Member | null>(null);

  const numColumns = 3;
  const gap = 5;

  useEffect(() => {
    async function fetchMembers() {
      if (members.length === 0) {
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
      }
    }
    fetchMembers()
  }, [])

  const renderItem = ({ id, firstName, lastName, categories }: Member) =>
  (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setCurrentEditMember({ id, firstName, lastName, categories });
          setEditModalVisible(!editModalVisible);
        }}
        key={id}>
        <MemberCard id={id} firstName={firstName} lastName={lastName} key={id} categories={categories} />
      </Pressable>
    </SafeAreaView>
  )
    ;

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingBottom: navBottomNavigatorHeight,
    }}>
      <View style={styles.container}>
        <Header label={tripTitle} />
        <CreateMemberModal modalVisible={createModalVisible} setModalVisible={setCreateModalVisible} setMembers={setMembers} members={members} />
        {currentEditMember &&
          <EditMemberModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            setMembers={setMembers}
            members={members}
            currentEditMember={currentEditMember}
            setCurrentEditMember={setCurrentEditMember}
          />}
        <FlatList
          data={members}
          renderItem={({ item }) => renderItem(item)}
          numColumns={numColumns}
          contentContainerStyle={{ gap }}
          columnWrapperStyle={{ gap }}
        />
        <Button icon="account-plus" mode="contained" onPress={() => setCreateModalVisible(!createModalVisible)}>
          Add new member
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default withTheme(MemberList);


