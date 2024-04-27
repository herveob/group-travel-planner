import React, { FC } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MD3Theme, Text } from 'react-native-paper';
import { SnowboardImage, SkiImage } from '../../assets';
import { scale } from 'react-native-size-matters';
import { withTheme } from 'react-native-paper';

type MemberCardProps = {
  id: string;
  firstName: string;
  lastName?: string;
  categories: ('snowboard' | 'ski')[];
  theme: MD3Theme;
};


const MemberCard: FC<MemberCardProps> = ({ firstName, lastName, categories, theme }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: theme.colors.secondaryContainer,
      gap: scale(10),
      alignItems: 'center',
      width: scale(100),
      height: scale(100),
      padding: scale(5),
    },
    imageContainer: {
      flexDirection: 'row',
    },
    tinyLogo: {
      width: scale(45),
      height: scale(45),
    },
  });
  const icons = {
    snowboard: SnowboardImage,
    ski: SkiImage,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {categories.map((category, i) => <Image style={styles.tinyLogo} key={i} source={icons[category]} />)}
      </View>
      <Text variant={'bodySmall'} ellipsizeMode='tail' numberOfLines={2}>{firstName}{' '}{lastName ? lastName.toUpperCase(): ''}</Text>
    </View>
  )
};

export default withTheme(MemberCard);