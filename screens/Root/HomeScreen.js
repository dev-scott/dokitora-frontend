import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import MainButton from "../../components/UI/MainButton";
import * as Notifications from "expo-notifications";
import data from "../../utils/data";
import Card from "../../components/UI/Card";

import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import Header from "../../components/UI/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useChatContext } from "stream-chat-expo";

const Profil = assets.Profil;

const LogoIcon = assets.LogoIcon;

const Bell = assets.Bell;

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const maxVisibleItems = 6;

const duration = 300;


const HomeScreen = ({navigation}) => {

  const [valueForCard , setValueForCard] = useState("")

  const activeIndex = useSharedValue(0);

  console.log("2");

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      console.log(activeIndex.value);

      if (activeIndex.value == 0) {
        return;
      }

      activeIndex.value = withTiming(activeIndex.value - 1, { duration });
      // setValueForCard(activeIndex.value)
      // console.log(valueForCard);
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      console.log("fling down");

      if (activeIndex.value == data.length - 1) {
        console.log("avant dernier , peux plus swiper");

        return;
      }

      activeIndex.value = withTiming(activeIndex.value + 1, { duration });
      // setValueForCard(activeIndex.value)
      // console.log(valueForCard);
    });

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permissions required",
          "Push notifications nedd the appropriate permissions"
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "ba564e9b-fe1e-4b24-9fac-13eb619fb567",
      });
      console.log(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("Notification received")
        // console.log(notification)
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received");
        console.log(response);
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  // const navigation = useNavigation();

  const authCtx = useContext(AuthContext);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  function submitLogout() {
    authCtx.logout();
  }
  const { client } = useChatContext();

  const username = authCtx.username;
  // const id = authCtx.id;

  const token = authCtx.token;

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: "You have a new notification",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[IVtRiGH43dN9YcNsLRcYuR]",
        title: "Test - set from a device",
        body: "This is a test !",
      }),
    });
  }


  
  // useEffect(() => {
  //   // connect the user

  //   const connectUser = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     console.log(token);
  //     const idUser = authCtx.id.toString();
  //     console.log(" l'id de l'user :  ",idUser);

  //     await client.connectUser(
  //       {
  //         id: authCtx.id.toString(),
  //         name: `${authCtx.username}`,
  //         image: "https://i.imgur.com/fR9Jz14.png",
  //       },
  //       client.devToken(authCtx.id.toString())
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
    <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
      <SafeAreaView
        className="bg-slate950 flex-1 relative px-[16px] pt-[44px] pb-8 "
        pointerEvents="box-none"
      >
        {/* <View className="flex w-full items-center justify-between flex-row ">
          <Pressable onPress={submitLogout}>
            <LogoIcon color="white"  width={19} height={32} />
          </Pressable>

          <Pressable className="  w-[183px] h-10  bg-white20  flex flex-row items-center   px-[12px] py-[12px]    rounded-3xl">
            <Bell />

            <Text className=" text-white text-xs font-normal ">
              {" "}
              Vous avez +9 notifications{" "}
            </Text>
          </Pressable>
          <Pressable onPress={openDrawer}>
            <Profil className="" width={40} height={40} />
          </Pressable>
        </View> */}

        <Header logout = {submitLogout} openDrawer={openDrawer} />

        <View className="mt-[50px]">
          <Text className="text-white text-opacity-80 text-base font-normal">
            Bonjour {username}
          </Text>
          <Text className="text-white text-[28px] font-semibold leading-[37.80px] mt-[24px] ">
            Comment allez-vous aujourd’hui ? {authCtx.id} {authCtx.username  }  
          </Text>
          <View className="flex gap-x-3 justify-start items-start flex-row  mt-[24px] ">
            <Pressable className="bg-white20  flex flex-row items-center justify-start  p-1 rounded-3xl">
              <Text className="text-xl">😊</Text>
            </Pressable>
            <Pressable className="bg-white20  flex flex-row items-center justify-start  p-1 rounded-3xl">
              <Text className="text-xl">😰</Text>
            </Pressable>
            <Pressable className="bg-white20  flex flex-row items-center justify-start  p-1 rounded-3xl">
              <Text className="text-xl">😒</Text>
            </Pressable>
            <Pressable className="bg-white20  flex flex-row items-center justify-start  p-1 rounded-3xl">
              <Text className="text-xl">🤧</Text>
            </Pressable>
          </View>
        </View>

        <View className=" flex flex-1  items-center mt-[50px] ">
          {data.map((c, index) => {
            return (
              <Card
                info={c}
                key={c.id}
                index={index}
                activeIndex={activeIndex}
                totalLength={data.length - 1}
                navigation={navigation}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default HomeScreen;
