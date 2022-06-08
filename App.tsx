import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import AppContainer from "./src/routes";
import { light } from "./src/theme";

export default function App() {
  const routeNameRef = useRef<any>(null);
  const navigationRef = useRef<any>(null);

  return (
    <NavigationContainer ref={navigationRef} onReady={() => {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }}>
      <ThemeProvider theme={light}>
        <AppContainer />
      </ThemeProvider>
    </NavigationContainer>
  );
}
