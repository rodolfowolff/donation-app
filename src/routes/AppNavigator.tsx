import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../context/auth";

//Pages
import Onboarding from "../pages/Onboarding";

import LoginDocument from "../pages/Login/LoginDocument";
import LoginPassword from "../pages/Login/LoginPassword";

import RegisterPersonalData from "../pages/Register/RegisterPersonalData";
import RegisterAddress from "../pages/Register/RegisterAddress";
import RegisterPassword from "../pages/Register/RegisterPassword";

import TabNavigator from "./TabNavigator";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/Profile/ChangePassword";
import OngDetails from "../pages/OngDetails";
import OngDonation from "../pages/OngDonation";

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
        type?: string;
        name?: string;
        token?: string;
      };
      Profile: undefined;
      ChangePassword: undefined;
      OngDetails: { id: string };
      OngDonation: { ongId: string };
    }
  }
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuth, setIsAuth, setPersonalData } = useAuth();

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem("@token_donation_app");
    const personalData = await AsyncStorage.getItem("@personal_donation_app");

    if (token) {
      setIsAuth(true);
      if (personalData) {
        setPersonalData(JSON.parse(personalData));
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      verifyToken();
    }, 1000);

    return () => {
      clearTimeout(1000);
    };
  }, []);

  return (
    //@ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <>
          <Stack.Screen name="Index" component={TabNavigator} />
          <Stack.Screen name="OngDetails" component={OngDetails} />
          <Stack.Screen name="OngDonation" component={OngDonation} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="LoginDocument" component={LoginDocument} />
          <Stack.Screen name="LoginPassword" component={LoginPassword} />
          <Stack.Screen
            name="RegisterPersonalData"
            component={RegisterPersonalData}
          />
          <Stack.Screen name="RegisterAddress" component={RegisterAddress} />
          <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
