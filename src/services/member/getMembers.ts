import { Member } from '../../types/Member.types';
import { getMembersData } from '../../database/members';

const getMembers = async (): Promise<Member[]> => {
  return await getMembersData();
};

export default getMembers;