import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootStack from "./navigations/RootStack";
import AuthContextProvider from "./store/AuthContext";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";

import { useFonts } from "expo-font";
import {
  Directions,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import UserLocationProvider from "./store/UserLocationContext";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const activeIndex = useSharedValue(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      console.log("fling up");
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      console.log("fling down");
    });

  useFonts({
    "sharp-sans": require("./assets/fonts/SharpSansNo1-Bold.ttf"),
  });
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <StatusBar style="light" />
          <Provider store={store}>
            <UserLocationProvider>
              <AuthContextProvider>
                <RootStack />
              </AuthContextProvider>
            </UserLocationProvider>
          </Provider>
        </>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
