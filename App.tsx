import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { GeneralProvider } from "./src/context/general";
import { RegisterProvider } from "./src/context/register";
import { AuthProvider } from "./src/context/auth";

import { ThemeProvider } from "styled-components";
import { light } from "./src/theme";
import AppContainer from "./src/routes";

export default function App() {
  const routeNameRef = useRef<any>(null);
  const navigationRef = useRef<any>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
    >
      <GeneralProvider>
        <RegisterProvider>
          <AuthProvider>
            <ThemeProvider theme={light}>
              <AppContainer />
            </ThemeProvider>
          </AuthProvider>
        </RegisterProvider>
      </GeneralProvider>
    </NavigationContainer>
  );
}
