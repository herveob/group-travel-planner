export type category = 'snowboard' | 'ski';
export type MemberCategoryCheckBoxProps = {
  createMemberCategories: ('snowboard' | 'ski')[];
  setCreateMemberCategories: (categories: category[]) => void;
};
