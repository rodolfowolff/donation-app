import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../pages/Onboarding';
import LoginVerifyEmail from '../pages/Login/LoginVerifyEmail';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Onboarding: undefined;
      LoginVerifyEmail: undefined;
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
    </Stack.Navigator>
  )
}

export default AppNavigator;
