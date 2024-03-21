import { collection, setDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { Member } from "../types/Member.types";
import { db } from "./db";

export const writeMemberData = async (member: Member): Promise<Member> => {
  try {

    const memberRef = doc(db, 'members', member.id);
    await setDoc(memberRef, member);
    const snapshot = await getDoc(memberRef);
    if (snapshot.exists()) {
      return snapshot.data() as Member;
    } else {
      throw new Error("New member data not found");
    }
  } catch (error) {
    throw error;
  }
};

export const getMembersData = async () => {
  try {
    const membersCollection = collection(db, 'members');
    const membersSnapshot = await getDocs(membersCollection);
    const members: Member[] = [];
    membersSnapshot.forEach(doc => {
      members.push(doc.data() as Member);
    });
    return members;
  } catch (error) {
    throw error;
  }
};

export const deleteMemberData = async (id: string): Promise<void> => {
  try {
    const memberRef = doc(db, 'members', id);
    await deleteDoc(memberRef);
  } catch (error) {
    throw error;
  }
};