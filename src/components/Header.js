import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Proptypes from 'prop-types';

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 90,
    backgroundColor: '#a29bfe',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

const Header = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
    </View>
  );
}

Header.propTypes = {
  label: Proptypes.string.isRequired
};

export default Header;

