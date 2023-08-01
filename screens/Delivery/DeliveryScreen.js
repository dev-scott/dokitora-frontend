import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { featured } from "../../constants/dummyData";
import MapView, { Marker } from "react-native-maps";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectpharmacy } from "../../slices/pharmacySlice";
import { emptyCart } from "../../slices/cartSlice";
import * as Notifications from "expo-notifications";

const DeliveryScreen = () => {
  const pharmacy = useSelector(selectpharmacy);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(emptyCart());
    navigation.navigate("HomeScreen");
  };

  const makePhoneCall = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:657704439");
    } else {
      Linking.openURL("tel:657704439");
    }
  };

  return (
    <SafeAreaView
      className="bg-white flex-1  relative "
      pointerEvents="box-none"
    >
      <MapView
        initialRegion={{
          latitude: pharmacy.lat,
          longitude: pharmacy.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: pharmacy.lat,
            longitude: pharmacy.lng,
          }}
          title={pharmacy.title}
          description={pharmacy.description}
          // pinColor={themeColors.bgColor(1)}
        />
      </MapView>

      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <TouchableOpacity className="absolute right-4 top-2"></TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20-30 Minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your Order is own its way
            </Text>
          </View>
          <Image
            className="h-24 w-24"
            source={require("../../assets/images/bikeGuy2.gif")}
          />
        </View>

        <View className="p-2 flex-row justify-between items-center bg-primary rounded-full my-5 mx-2">
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="p-1 rounded-full"
          >
            <Image
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="w-16 h-16 rounded-full"
              source={require("../../assets/images/deliveryGuy.png")}
            />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Syed Noman</Text>
            <Text className="text-white font-semibold">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity
              onPress={makePhoneCall}
              className="bg-green600 p-2 rounded-full"
            >
              <Icon.Phone fill={"white"} stroke={"white"} strokeWidth="1" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              className="bg-zin800 p-2 rounded-full"
            >
              <Icon.X stroke={"white"} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
