import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PropTypes from "prop-types";
import { scale } from "react-native-size-matters";

import { SnowboardImage, SkiImage } from '../../assets';

const icons = {
  snowboard: SnowboardImage,
  ski: SkiImage,
};

const MemberCategoryCheckBox = ({ createMemberCategories, setCreateMemberCategories }) => {

  console.log({ createMemberCategories });
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
        <BouncyCheckbox
          style={{
            marginTop: scale(14),
            marginBottom: scale(14),
          }}
          textStyle={{
            textDecorationLine: "none",
          }}
          isChecked={snowboardCheck}
          disableBuiltInState
          onPress={() => setSnowboardCheck(!snowboardCheck)}
        />
        <Image style={styles.tinyLogo} source={icons.snowboard} />
      </View>
      <View style={styles.checkBoxContainer}>
        <BouncyCheckbox
          style={{
            marginTop: scale(14),
            marginBottom: scale(14),
          }}
          textStyle={{
            textDecorationLine: "none",
          }}
          isChecked={skiCheck}
          disableBuiltInState
          onPress={() => skiboardCheck(!skiCheck)}
        />
        <Image style={styles.tinyLogo} source={icons.ski} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: scale(16),
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tinyLogo: {
    width: scale(45),
    height: scale(45),
  },
});


MemberCategoryCheckBox.propTypes = {
  createMemberCategories: PropTypes.arrayOf(PropTypes.oneOf(["snowboard", "ski"])).isRequired,
  setCreateMemberCategories: PropTypes.func.isRequired,
};



export default MemberCategoryCheckBox;