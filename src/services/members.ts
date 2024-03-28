import { Member } from '../types/Member.types';
import { writeMemberData, deleteMemberData, getMembersData } from '../database/members';

export const createMember = async (member: Member): Promise<Member> => {
    return await writeMemberData(member);
};

export const deleteMember = async (id: string) => {
    await deleteMemberData(id);
    const members = await getMembers();
    return members.filter((member) => member.id !== id);
};

export const getMembers = async (): Promise<Member[]> => {
    return await getMembersData();
};

export const updateMember = async (member: Member): Promise<Member> => {
    return await writeMemberData(member);
};