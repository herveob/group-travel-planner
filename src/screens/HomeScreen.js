import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';

import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import getMembers from '../services/member/getMembers';
import CreateMemberModal from '../components/CreateMemberModal';
import EditMemberModal from '../components/EditMemberModal';
const HomeScreen = () => {
  const [members, setMembers] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState(null);

  const getTotalMembers = (members) => members.length;
  const getTotalSnowboarders = (members) => members.filter(member => member.categories.includes('snowboard')).length;
  const getTotalSkiers = (members) => members.filter(member => member.categories.includes('ski')).length;
  const getTotalSnowboardersAndSkiers = (members) => members.filter(member => member.categories.includes('snowboard') && member.categories.includes('ski')).length;

  useEffect(() => {
    async function fetchMembers() {
      if (members === null) {
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
      }
    }
    fetchMembers()
  }, [members])

  return (
    <View style={styles.container}>
      <Header label={'Group Travel Planner'} />
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
      <ScrollView contentContainerStyle ={styles.memberListContainer}>
        {members && members.map(({ id, firstName, lastName, categories }) => (
          <Pressable
            onPress={() => {
              setCurrentEditMember({ id, firstName, lastName, categories });
              setEditModalVisible(!editModalVisible);
            }}
            key={id}>
            <MemberCard firstName={firstName} lastName={lastName} key={id} categories={categories} />
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.buttonOpen,
          pressed && { opacity: .8, backgroundColor: 'lightgreen' }
        ]}
        onPress={() => setCreateModalVisible(!createModalVisible)}
      >
        <Text>Add new member</Text>
      </Pressable>
      {members && <Text style={styles.totals}>Total members: {getTotalMembers(members)}</Text>}
      {members && <Text style={styles.totals}>Total snowboarders: {getTotalSnowboarders(members)}</Text>}
      {members && <Text style={styles.totals}>Total skiers: {getTotalSkiers(members)}</Text>}
      {members && <Text style={styles.totals}>Total snowboarder that also are skiers: {getTotalSnowboardersAndSkiers(members)}</Text>}
      <StatusBar style='dark-content' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  memberListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: scale(5),
  },
  button: {
    borderRadius: scale(12),
    padding: scale(10),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  totals: {
    marginBottom: scale(10),
  },
});

export default HomeScreen;


