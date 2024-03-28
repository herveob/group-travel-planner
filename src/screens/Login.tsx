import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, withTheme, MD3Theme } from 'react-native-paper';

import useFirebaseAuth from '../database/useFirebaseAuth';
import { scale } from 'react-native-size-matters';

type LoginProps = {
  theme: MD3Theme;
};

const Login: FC<LoginProps> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, createUser, error } = useFirebaseAuth();

  const handleSignUp = async () => {
    await createUser(email, password);
  };
  const handleSignIn = async () => {
    await signIn(email, password);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: scale(8),
    },
    error: {
      color: theme.colors.error,
      fontSize: scale(12),
    }
  });

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button mode="elevated" onPress={handleSignUp}>
          <Text>REGISTER</Text>
        </Button>
        <Text>{'I already have an account, sign me in instead'}</Text>
        <Button mode="contained"  onPress={handleSignIn}>
          <Text>SIGN IN</Text>
        </Button>
        <Text style={styles.error}>{error}</Text>
      </View>
    </SafeAreaView>
  );
}


export default withTheme(Login);
