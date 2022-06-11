import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { IconImage } from "../styles/global.style";
import HomeIcon from "../assets/icons/home-icon.png";
import HomeIconActive from "../assets/icons/home-icon-active.png";
import FavoritesIcon from "../assets/icons/favorites-icon.png";
import FavoritesActive from "../assets/icons/favorites-icon-active.png";
import HistoryIcon from "../assets/icons/history-icon.png";
import HistoryActive from "../assets/icons/history-icon-active.png";
import ProfileIcon from "../assets/icons/profile-icon.png";
import ProfileActive from "../assets/icons/profile-icon-active.png";

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
            return <IconImage source={focused ? HomeIconActive : HomeIcon} />;
          } else if (route.name === "Favoritos") {
            return (
              <IconImage source={focused ? FavoritesActive : FavoritesIcon} />
            );
          } else if (route.name === "Historico") {
            return <IconImage source={focused ? HistoryActive : HistoryIcon} />;
          } else {
            return <IconImage source={focused ? ProfileActive : ProfileIcon} />;
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
