import getMembers from './getMembers';
import { deleteMemberData } from '../../database/members';
const deleteMember = async (id: string) => {
  await deleteMemberData(id);
  const members = await getMembers();
  return members.filter((member) => member.id !== id);
};

export default deleteMember;