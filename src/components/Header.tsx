import { FC } from 'react';
import { View, Text } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';

import { HeaderProps } from '../types/Header.types';

const Header: FC<HeaderProps> = ({ label, theme }) => {
  return (
    <Appbar.Header>
      {/* <Appbar.BackAction onPress={_goBack} /> */}
      <Appbar.Content title={label} />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
    </Appbar.Header>
  );
}

export default withTheme(Header);

