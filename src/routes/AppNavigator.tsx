import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Pages
import Loading from "../pages/Loading";
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
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem("@token_donation_app");
    if (token) {
      setIsLogged(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    //@ts-ignore
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={"Onboarding"}
    >
      {loading && <Stack.Screen name="Loading" component={Loading} />}
      {!loading && isLogged && (
        <Stack.Screen name="Index" component={TabNavigator} />
      )}
      {!loading && !isLogged && (
        //@ts-ignore
        <Stack.Group>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="LoginDocument" component={LoginDocument} />
          <Stack.Screen name="LoginPassword" component={LoginPassword} />
          <Stack.Screen
            name="RegisterPersonalData"
            component={RegisterPersonalData}
          />
          <Stack.Screen name="RegisterAddress" component={RegisterAddress} />
          <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
