import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { assets } from "../constants";
import HomeScreen from "../screens/Root/HomeScreen";
import PharmacyList from "../screens/Pharmacy/PharmacyList";
import HomeDelivery from "../screens/Delivery/HomeDelivery";
import SearchPharmacy from "../screens/Pharmacy/SearchPharmacy";
import { ProfileScreen } from "../screens";
import { Avatar } from "native-base";
import { AuthContext } from "../store/AuthContext";
import OrderList from "../screens/Delivery/OrderList";
import ChatRoot from "../screens/Chat/ChatRoot";
import DeliveryList from "../screens/OnlyDeliveryDrivers/DeliveryList";

const Profil = assets.Profil;

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const authCtx = useContext(AuthContext);

  function submitLogout() {
    authCtx.logout();
  }

  const user = authCtx.username;
  const email = authCtx.email;

  return (
    <View className="flex flex-1">
      <DrawerContentScrollView className="" {...props}>
        <SafeAreaView className="flex relative flex-1  ">
          {/* <View
          style={{
            height: 200,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
        >
          <Profil />

          <Text
            style={{
              fontSize: 22,
              marginVertical: 6,
              fontWeight: "bold",
              color: "#111",
            }}
          >
            Isabella Joanna
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#111",
            }}
          >
            Product Manager
          </Text>
        </View> */}

          <View className="pl-5 w-full  ">
            <View className="flex flex-row  mt-3">
              <Ionicons name="person-circle" size={80} color="#777777" />

              <View className="flex flex-col ml-3">
                <Text>{user}</Text>
                <Text>{email}</Text>
              </View>
            </View>
          </View>

          {/* <Drawer.Section >

              </Drawer.Section>

         */}

          <DrawerItemList {...props} />

          <View className="border-t-0.5 border-[#808080]">
            {/* <Text>Preference</Text> */}
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>

      <View className="mb-3  border-t-0.5 border-[#808080]">
        <DrawerItem
          icon={({ color, size }) => (
            <SimpleLineIcons name="logout" size={24} color="#808080" />
          )}
          label="Logout"
          onPress={submitLogout}
        />
      </View>
    </View>
  );
}

const DrawerNavigation = () => {
  const authCtx = useContext(AuthContext);

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
        name="OrderList"
        options={{
          headerShown: false,
          title: "Histoique des commandes",
          drawerIcon: () => (
            <FontAwesome name="history" size={20} color="#808080" />
          ),
        }}
        component={OrderList}
      />
      <Drawer.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
          title: "Profile",
          drawerIcon: () => (
            <Ionicons name="person" size={24} color="#808080" />
          ),
        }}
        component={ProfileScreen}
      />

      {authCtx.deliveryUser ? (
        <Drawer.Screen
          name="DeliveryList"
          options={{
            headerShown: false,
            title: "Vos livraison",
            drawerIcon: () => (
              <Ionicons name="person" size={24} color="#808080" />
            ),
          }}
          component={DeliveryList}
        />
      ) : null}

      <Drawer.Screen
        name="ChatRoot"
        options={{
          headerShown: false,
          title: "My chat",
          drawerIcon: () => (
            <Ionicons
              name="ios-chatbubble-ellipses-sharp"
              size={24}
              color="#808080"
            />
          ),
        }}
        component={ChatRoot}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
