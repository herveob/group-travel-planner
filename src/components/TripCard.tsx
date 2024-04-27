import React, { FC } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { MD3Theme, Text, withTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

type TripCardProps = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  membersCount: number;
  theme: MD3Theme;
};

const TripCard: FC<TripCardProps> = ({ id, startDate, endDate, membersCount, title, theme }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: theme.colors.secondaryContainer,
      gap: scale(10),
      alignItems: 'center',
      padding: scale(5),
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant='displayMedium'>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>{'Du '}{startDate.split(' ')[0]}{ ' au '}</Text>
          <Text>{endDate.split(' ')[0]}</Text>
        </View>
        <Text>{'member count: '}{membersCount}</Text>
      </View>
    </SafeAreaView>
  )
}

export default withTheme(TripCard);