import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Pages
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import History from "../pages/History";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();
  return (
    //@ts-ignore
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarAllowFontScaling: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Inicio") {
            return (
              //@ts-ignore
              <AntDesign
                name="home"
                size={focused ? 27 : 22}
                color={focused ? colors.primary : colors.gray}
              />
            );
          } else if (route.name === "Favoritos") {
            return (
              //@ts-ignore
              <AntDesign
                name="hearto"
                size={focused ? 27 : 22}
                color={focused ? colors.primary : colors.gray}
              />
            );
          } else if (route.name === "Historico") {
            return (
              //@ts-ignore
              <AntDesign
                name="filetext1"
                size={focused ? 27 : 22}
                color={focused ? colors.primary : colors.gray}
              />
            );
          } else {
            return (
              //@ts-ignore
              <AntDesign
                name="user"
                size={focused ? 27 : 22}
                color={focused ? colors.primary : colors.gray}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Favoritos" component={Favorites} />
      <Tab.Screen name="Historico" component={History} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
