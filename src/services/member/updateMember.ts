import { Member } from '../../types/Member.types';
import { writeMemberData } from '../../database/members';

const updateMember = async (member: Member): Promise<Member> => {
    return await writeMemberData(member);
};

export default updateMember;