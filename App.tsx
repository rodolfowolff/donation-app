import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppContainer from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
}
