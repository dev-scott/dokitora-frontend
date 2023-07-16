import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootStack from "./navigations/RootStack";
import AuthContextProvider from "./store/AuthContext";
import { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";

import { useFonts } from "expo-font";


export default function App() {

  useFonts({

    "sharp-sans":require("./assets/fonts/SharpSansNo1-Bold.ttf")

  })
  return (
    <NativeBaseProvider>
      <>
        <StatusBar style="light" />

        <AuthContextProvider>
          <RootStack />
        </AuthContextProvider>
      </>
    </NativeBaseProvider>
  );
}
