import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../pages/Onboarding';
import LoginVerifyEmail from '../pages/Login/LoginVerifyEmail';
import LoginPassword from '../pages/Login/LoginPassword';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Onboarding: undefined;
      LoginVerifyEmail: undefined;
      LoginPassword: undefined;
    }
  }
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginVerifyEmail" component={LoginVerifyEmail} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
    </Stack.Navigator>
  )
}

export default AppNavigator;
