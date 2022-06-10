import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "../pages/Onboarding";
import LoginVerifyEmail from "../pages/Login/LoginVerifyEmail";
import LoginPassword from "../pages/Login/LoginPassword";
import TabNavigator from "./TabNavigator";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Onboarding: undefined;
      LoginVerifyEmail: { type: string };
      LoginPassword: { type: string };
    }
  }
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    //@ts-ignore
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Index"
    >
      <Stack.Screen name="Index" component={TabNavigator} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginVerifyEmail" component={LoginVerifyEmail} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
