import React from 'react';
import { MemberList, Home, Settings, Login } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sentry from '@sentry/react-native';
// import { AppRegistry } from 'react-native';
import { MD3DarkTheme as DefaultTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { expo } from './app.json';
import { fr, registerTranslation } from 'react-native-paper-dates'
import useFirebaseAuth from './src/database/useFirebaseAuth';

registerTranslation('fr', fr)

// const { name: appName } = expo;

// console.log({ appName });

Sentry.init({
  dsn: 'https://87ad9f299ecd87243094429940c4377b@o4506949305630720.ingest.us.sentry.io/4506949306679296',
});

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const { DartTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });

const theme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(206, 189, 255)',
    onPrimary: 'rgb(57, 5, 144)',
    primaryContainer: 'rgb(80, 43, 167)',
    onPrimaryContainer: 'rgb(232, 221, 255)',
    secondary: 'rgb(203, 195, 220)',
    onSecondary: 'rgb(51, 45, 65)',
    secondaryContainer: 'rgb(73, 68, 88)',
    onSecondaryContainer: 'rgb(232, 222, 248)',
    tertiary: 'rgb(239, 184, 201)',
    onTertiary: 'rgb(73, 37, 50)',
    tertiaryContainer: 'rgb(99, 59, 73)',
    onTertiaryContainer: 'rgb(255, 217, 227)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 27, 30)',
    onBackgroun: 'rgb(230, 225, 230)',
    surface: 'rgb(28, 27, 30)',
    onSurface: 'rgb(230, 225, 230)',
    surfaceVariant: 'rgb(72, 69, 78)',
    onSurfaceVariant: 'rgb(202, 196, 207)',
    outline: 'rgb(148, 143, 153)',
    outlineVariant: 'rgb(72, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(230, 225, 230)',
    inverseOnSurface: 'rgb(49, 48, 51)',
    inversePrimary: 'rgb(104, 71, 192)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 35, 41)',
      level2: 'rgb(42, 40, 48)',
      level3: 'rgb(48, 45, 55)',
      level4: 'rgb(49, 46, 57)',
      level5: 'rgb(53, 50, 62)'
    },
    surfaceDisabled: 'rgba(230, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(230, 225, 230, 0.38)',
    backdrop: 'rgba(50, 47, 56, 0.4)'
  }
}

const App = () => {
  const { user, loading } = useFirebaseAuth();

  return (
    <PaperProvider theme={theme}>
      {!loading && user
        ? (<NavigationContainer theme={DartTheme}>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="MemberList"
              component={MemberList}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>)
        : (
          !loading && <NavigationContainer theme={DartTheme}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
    </PaperProvider>
  );
}

// export default Sentry.wrap(AppRegistry.registerComponent(appName, () => App));
export default Sentry.wrap(App);
