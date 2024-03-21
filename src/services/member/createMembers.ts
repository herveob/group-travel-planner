import { Member } from '../../types/Member.types';
import { writeMemberData } from '../../database/members';

export const createMember = async (member: Member): Promise<Member> => {
    return await writeMemberData(member);
};
