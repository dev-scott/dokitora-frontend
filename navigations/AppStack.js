
import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import PharmacyDetail from "../screens/Delivery/PharmacyDetail";
import HomeDelivery from "../screens/Delivery/HomeDelivery";
import PharmacyList from "../screens/Pharmacy/PharmacyList";
import HomeScreen from "../screens/Root/HomeScreen";
import CartScreen from "../screens/Delivery/CartScreen";
import PreparingOrder from "../screens/Delivery/PreparingOrder";
import DeliveryScreen from "../screens/Delivery/DeliveryScreen";
import SearchPharmacy from "../screens/Pharmacy/SearchPharmacy";
import VoiceCallPage from "../screens/econsultation/VideoCallPage";
import BlogDetail from "../screens/Blog/BlogDetail";
import PharamcyProfil from "../screens/Pharmacy/PharamcyProfil";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
// import ChatRoot from "../screens/Chat/ChatRoot";
import ChannelDetail from "../screens/Chat/channel/ChannelDetail";
import Layout from "../screens/Chat/LayoutRoot";
import LayoutRoot from "../screens/Chat/LayoutRoot";
import NewChat from "../screens/Chat/NewChat";
import DoctorDetail from "../screens/Doctor/DoctorDetail";
import DeliveryDetail from "../screens/OnlyDeliveryDrivers/DeliveryDetail";
import OrderDetail from "../screens/Delivery/OrderDetail";
import DoctorNote from "../screens/Doctor/DoctorNote";

const Stack = createStackNavigator();

const AppStack = () => {
  const isAndroid = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        // screenOptions={{ headerShown: false }}
        screenOptions={{
          gestureEnabled: false,
          // headerShown: false,

          ...(isAndroid && TransitionPresets.ModalPresentationIOS),
        }}
      >
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PharmacyDetail"
          component={PharmacyDetail}
          options={{ title: "" }}
        />
        <Stack.Screen name="BlogDetail" component={BlogDetail} />
        <Stack.Screen
          name="CartScreen"
          // options={{ presentation: "modal" }}
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDelivery"
          component={HomeDelivery}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PharmacyList" component={PharmacyList} />

        <Stack.Screen
          name="PharamcyProfil"
          options={{ title: "" }}
          component={PharamcyProfil}
          screenOptions={{
            presentation: "modal",
          }}
        />

        <Stack.Screen name="VoiceCallPage" component={VoiceCallPage} />
        <Stack.Screen
          name="SearchPharmacy"
          component={SearchPharmacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreparingOrder"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={PreparingOrder}
        />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={DeliveryScreen}
        />
        {/* <Stack.Screen
          name="ChatRoot"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={ChatRoot}
        /> */}
        <Stack.Screen
          name="LayoutRoot"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={LayoutRoot}
        />
        <Stack.Screen
          name="NewChat"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={NewChat}
        />
        <Stack.Screen
          name="DoctorDetail"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={DoctorDetail}
        />
  
        <Stack.Screen
          name="DeliveryDetail"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={DeliveryDetail}
        />
  
        <Stack.Screen
          name="ChannelDetail"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={ChannelDetail}
        />
        <Stack.Screen
          name="OrderDetail"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={OrderDetail}
        />
        <Stack.Screen
          name="DoctorNote"
          options={{ presentation: "fullScreenModal", headerShown: false }}
          component={DoctorNote}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
