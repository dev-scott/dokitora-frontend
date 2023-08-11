import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { featured } from "../../constants/dummyData";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectpharmacy } from "../../slices/pharmacySlice";
import { emptyCart } from "../../slices/cartSlice";
import * as Notifications from "expo-notifications";
import { useChatContext } from "stream-chat-expo";
import { AuthContext } from "../../store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeliveryPerson } from "../../utils/api";
import { Ionicons } from "@expo/vector-icons";
import { UserLocationContext } from "../../store/UserLocationContext";
import Svg, { Circle } from 'react-native-svg';

const DeliveryScreen = () => {
  const [deliveryPerson, setDeliveryPerson] = useState([]);
  const [mapRegion, setmapRegion] = useState([]);
  const [listCoordinates, setListCoordinate] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);

  const pharmacy = useSelector(selectpharmacy);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

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

  const startChannel = async () => {
    const channel = client.channel("messaging", {
      members: [deliveryPerson.id.toString(), authCtx.id.toString()],
    });
    await channel.watch();

    // router.push(`/chat/channel/${channel.id}`);
    navigation.navigate("ChannelDetail", { id: channel.id });
  };

  useEffect(() => {
    // connect the user

    const connectUser = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const idUser = authCtx.id.toString();
      console.log(" l'id de l'user :  ", idUser);

      await client.connectUser(
        {
          id: authCtx.id.toString(),
          name: `${authCtx.username}`,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken(authCtx.id.toString())
      );
      const channel = client.channel("livestream", "public", {
        name: "Public",
        // image: 'https://i.imgur.com/fR9Jz14.png',
      });
      await channel.create();
    };
    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  useEffect(() => {
    getDelivery();
  }, []);

  const getDelivery = async () => {
    const result = (await getDeliveryPerson()).data;

    const resp = result.data;

    console.log(resp);
    setDeliveryPerson(resp);
  };

  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });

      console.log(location)

     
    }
  }, [location]);

  useEffect(()=>{

    // setListCoordinate([
    //   {
    //     latitude: pharmacy.latitude,
    //     longitude: pharmacy.longitude,
    //   },
    //   {
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //   },
    // ]);

    setListCoordinate([
      { latitude: pharmacy.lat, longitude: pharmacy.lng }, // Coordonnées du premier marqueur (point de départ)
      { latitude: location.coords.latitude , longitude: location.coords.longitude }, // Coordonnées du deuxième marqueur (point d'arrivée)
    ]);

  },[])

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

        <Marker title="You" coordinate={mapRegion} pinColor={"blue"} />

        <Polyline coordinates={listCoordinates} strokeWidth={4} strokeColor="blue" />


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
            <Text className="text-lg font-bold text-white">
              {deliveryPerson.username}
            </Text>
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
              onPress={startChannel}
              className="bg-zin800 p-2 rounded-full"
            >
              <Ionicons
                name="ios-chatbubble-ellipses-sharp"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
