import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";


import { assets } from "../constants";
import HomeScreen from "../screens/Root/HomeScreen";
import PharmacyList from "../screens/Pharmacy/PharmacyList";
import HomeDelivery from "../screens/Delivery/HomeDelivery";
import SearchPharmacy from "../screens/Pharmacy/SearchPharmacy";
import { ProfileScreen } from "../screens";


const Profil = assets.Profil

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView className="" {...props}>
      <SafeAreaView className=" ">

      <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}
                >
                  <Profil/>
            
                  <Text
                    style={{
                      fontSize: 22,
                      marginVertical: 6,
                      fontWeight: "bold",
                      color: "#111"
                    }}
                  >Isabella Joanna</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#111"
                    }}
                  >Product Manager</Text>
                </View>
      <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const DrawerNavigation = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="HomeScreen"
          options={{
            headerShown: false,
            title: "Home",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#808080" />
            ),
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          name="ProfileScreen"
          options={{
            headerShown: false,
            title: "Home",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#808080" />
            ),
          }}
          component={ProfileScreen}
        />
       
      </Drawer.Navigator>
  );
};

export default DrawerNavigation;
