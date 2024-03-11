import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Proptypes from 'prop-types';
import { SnowboardImage, SkiImage } from '../../assets';
import { scale } from 'react-native-size-matters';

const MemberCard = ({ firstName, lastName, categories }) => {
  const icons = {
    snowboard: SnowboardImage,
    ski: SkiImage,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {categories.map((category, i) => <Image style={styles.tinyLogo} key={i} source={icons[category]} />)}
      </View>
      <Text style={styles.fullname}>{firstName}{' '}{lastName.toUpperCase()}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: scale(10),
    backgroundColor: '#a6edc6',
    alignItems: 'center',
    width: scale(100),
    height: scale(100),
    borderRadius: scale(5),
    // justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  tinyLogo: {
    width: scale(45),
    height: scale(45),
  },
  fullname: {
    fontSize: scale(12),
  }
});

MemberCard.propTypes = {
  firstName: Proptypes.string.isRequired,
  lastName: Proptypes.string,
  categories: Proptypes.arrayOf(Proptypes.oneOf(['snowboard', 'ski'])).isRequired,
}

export default MemberCard;