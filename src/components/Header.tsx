import { FC, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Appbar, Menu, withTheme } from 'react-native-paper';

import useFirebaseAuth from '../database/useFirebaseAuth';
import { HeaderProps } from '../types/Header.types';


const Header: FC<HeaderProps> = ({ label, theme }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { signOut } = useFirebaseAuth();
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title={label} />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={() => (setOpenMenu(!openMenu))} /> */}
        <Menu
          visible={openMenu}
          onDismiss={() => setOpenMenu(false)}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={() => (setOpenMenu(!openMenu))} />
          }
        >
          <Menu.Item leadingIcon="logout" onPress={signOut} title="Logout" />
        </Menu>
      </Appbar.Header>
    </SafeAreaView>
  );
}

export default withTheme(Header);

