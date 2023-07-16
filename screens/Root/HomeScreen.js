import { View, SafeAreaView, Text, Alert, Platform } from "react-native";
import React, { useContext, useEffect } from "react";
import { assets } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import MainButton from "../../components/UI/MainButton";
import * as Notifications from "expo-notifications";

const Profil = assets.Profil;

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const HomeScreen = () => {
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

      const pushTokenData = await Notifications.getExpoPushTokenAsync({projectId: 'ba564e9b-fe1e-4b24-9fac-13eb619fb567'});
      console.log(pushTokenData);

      if(Platform.OS === "android"){

        Notifications.setNotificationChannelAsync('default', {
          name:'default',
          importance:Notifications.AndroidImportance.DEFAULT
        } )

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

  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  function submitLogout() {
    authCtx.logout();
  }

  // useEffect(()=>{

  //   const username = AuCtx.username

  //   console.log(username)

  // },[])

  const username = authCtx.username;

  const token = authCtx.token;

  // console.log(token);
  // console.log("scott")

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

  return (
    <SafeAreaView className=" flex-1  bg-primary pt-[32px] px-[16px] pb-8">
      <View className="flex w-full    flex-row items-center justify-between">
        <TouchableOpacity onPress={submitLogout}>
          <Text className="text-white text-2xl font-semibold">Dokitora </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openDrawer}>
          <Profil />
        </TouchableOpacity>
      </View>

      <View className="mt-[34px]">
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="text-white text-base font-medium"
        >
          Bonjour {username}
        </Text>
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="mt-[5px] text-white font-2xl font-semibold leading-loose "
        >
          Qu’est ce qu’on vous livre aujourd’hui ?
        </Text>
      </View>

      <View className=" w-full mt-4 h-10 p-3 bg-white bg-opacity-20 rounded-3xl  "></View>

      <MainButton
        text="Demmarer avec Dokitor"
        color="#808080"
        icon="LogoIcon"
        onPress={scheduleNotificationHandler}
        iconName="arrow-right"
      ></MainButton>
    </SafeAreaView>
  );
};

export default HomeScreen;
