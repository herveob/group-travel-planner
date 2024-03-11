const deleteMember = async (id) => {
  const memebers = await getMembers();
  return memebers.filter((member) => member.id !== id);
};

export default deleteMember;