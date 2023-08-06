import AsyncStorage from "@react-native-async-storage/async-storage";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootStack from "./navigations/RootStack";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { useContext, useEffect, useState } from "react";
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
import "expo-dev-client";
import { StreamChat } from "stream-chat";

import { OverlayProvider, Chat } from "stream-chat-expo";

const API_KEY = "xas8ht3tagya";
const API_SECRET="pm73b5snrcht3cqh79vab4yu43mhkkjwbbuxprq76g7tpjfg4fyzh22gdcffeqhc"
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const authCtx = useContext(AuthContext);

  const idUser = authCtx.id.toString();
console.log(idUser)
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

  // useEffect(() => {
  //   // connect the user
  //   // console.log(idUser);

  //   const connectUser = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     console.log(token);

  //     await client.connectUser(
  //       {
  //         id: '1000',
  //         name: `${authCtx.username}`,
  //         image: "https://i.imgur.com/fR9Jz14.png",
  //       },
  //       client.devToken('1000')
  //     );
  //     const channel = client.channel("livestream", "public", {
  //       name: "Public",
  //       // image: 'https://i.imgur.com/fR9Jz14.png',
  //     });
  //     await channel.create();
  //   };
  //   connectUser();

  //   return () => {
  //     client.disconnectUser();
  //   };
  // }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
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
      </Chat>
    </OverlayProvider>
  );
}
