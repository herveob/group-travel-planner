import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { SnowboardImage, SkiImage } from '../../assets';
import { MemberCategoryCheckBoxProps } from '../types/MemberCategoryCheckBox.types';
import { scale } from 'react-native-size-matters';

const icons = {
  snowboard: SnowboardImage,
  ski: SkiImage,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: scale(16),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: scale(45),
    height: scale(45),
  },
});

const MemberCategoryCheckBox: FC<MemberCategoryCheckBoxProps> = ({ createMemberCategories, setCreateMemberCategories }) => {

  const [snowboardCheck, setSnowboardCheck] = useState(createMemberCategories.includes('snowboard'));
  const [skiCheck, skiboardCheck] = useState(createMemberCategories.includes('ski'));

  useEffect(() => {
    if (snowboardCheck && !createMemberCategories.includes('snowboard')) {
      setCreateMemberCategories([...createMemberCategories, 'snowboard']);
    }
    if (!snowboardCheck && createMemberCategories.includes('snowboard')) {
      setCreateMemberCategories(createMemberCategories.filter((item) => item !== 'snowboard'));
    }
    if (skiCheck && !createMemberCategories.includes('ski')) {
      setCreateMemberCategories([...createMemberCategories, 'ski']);
    }
    if (!skiCheck && createMemberCategories.includes('ski')) {
      setCreateMemberCategories(createMemberCategories.filter((item) => item !== 'ski'));
    }
  }, [snowboardCheck, skiCheck]);


  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.checkBoxContainer}>
        <Checkbox
          status={snowboardCheck ? 'checked' : 'unchecked'}
          onPress={() => setSnowboardCheck(!snowboardCheck)}
        />
        <Image style={styles.tinyLogo} source={icons.snowboard} />
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          status={skiCheck ? 'checked' : 'unchecked'}
          onPress={() => skiboardCheck(!skiCheck)}
        />
        <Image style={styles.tinyLogo} source={icons.ski} />
      </View>
    </SafeAreaView>
  );
};

export default MemberCategoryCheckBox;