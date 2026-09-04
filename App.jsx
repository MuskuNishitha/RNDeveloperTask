import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Splash/SplashScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import UpcomingScreen from './src/screens/Upcoming/UpcomingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Bookings"
          component={UpcomingScreen}
        />

        <Stack.Screen
          name="Support"
          component={UpcomingScreen}
        />

        <Stack.Screen
          name="Account"
          component={UpcomingScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;