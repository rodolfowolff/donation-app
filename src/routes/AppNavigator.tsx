import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "../pages/Onboarding";
import LoginDocument from "../pages/Login/LoginDocument";
import LoginPassword from "../pages/Login/LoginPassword";
import RegisterPersonalData from "../pages/Register/RegisterPersonalData";
import RegisterAddress from "../pages/Register/RegisterAddress";
import RegisterPassword from "../pages/Register/RegisterPassword";
import TabNavigator from "./TabNavigator";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Onboarding: undefined;
      LoginDocument: { type: string };
      LoginPassword: { type: string };
      RegisterPersonalData: { type: string };
      RegisterAddress: { type: string };
      RegisterPassword: { type: string };
      Index: {
        type: string;
        name: string;
        token: string;
      };
    }
  }
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    //@ts-ignore
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginDocument" component={LoginDocument} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen
        name="RegisterPersonalData"
        component={RegisterPersonalData}
      />
      <Stack.Screen name="RegisterAddress" component={RegisterAddress} />
      <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
      <Stack.Screen name="Index" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
