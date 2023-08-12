import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import GoogleMapView from "../../components/UI/GoogleMapView";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import * as Icon from "react-native-feather";
import { assets } from "../../constants";
import { useChatContext } from "stream-chat-expo";

const DoctorDetail = ({ route }) => {
    const { client } = useChatContext();

  const { user } = route.params;
  console.log(user);

  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();

  const startChannel = async () => {
    const channel = client.channel("messaging", {
      members: [user.id.toString(), authCtx.id.toString()],
    });
    await channel.watch();

    // router.push(`/chat/channel/${channel.id}`);
    navigation.navigate("ChannelDetail", { id: channel.id });
  };

  const [mapRegion, setmapRegion] = useState([]);

  useEffect(() => {
    setmapRegion({
      latitude: user.attributes?.latitude ?? 0,
      longitude: user.attributes?.longitude ?? 0,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    });
  }, []);

  const Doctor = assets.Doctor;

  return (
    <SafeAreaView
      className="bg-white flex-1 relative px-[16px] pt-[4px] pb-2 "
      pointerEvents="box-none"
    >
      <TouchableOpacity
        onPress={navigation.goBack}
        className="z-10 mb-3 bg-primary rounded-xl w-8 p-1 shadow "
      >
        <Icon.ArrowLeft strokeWidth={3} stroke="white" />
      </TouchableOpacity>
      <View className=" flex flex-row  bg-green600 px-4   w-full h-[200px] rounded-xl ">
        <View className=" items-start justify-center flex-1 ">
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-white  text-2xl "
          >
            Mr . {user.username}
          </Text>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-white mt-2"
          >
            Pediatre
          </Text>
        </View>
        <View className="flex-1 flex justify-center items-center ">
          <Doctor />
        </View>
      </View>

      <View className="w-full  h-[100px] mt-2 flex flex-row justify-around items-center ">
        <View className="flex ">
          <View>
            <Text className="text-gray-dark">Language</Text>
          </View>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-[20px] text-gray-dark"
          >
            Eng
          </Text>
        </View>
        <View className="flex ">
          <View>
            <Text className="text-gray-dark">Experience</Text>
          </View>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-[20px] text-gray-dark"
          >
            7 ans
          </Text>
        </View>
        <View className="flex ">
          <View>
            <Text className="text-gray-dark">Language</Text>
          </View>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-[20px] text-gray-dark"
          >
            Eng
          </Text>
        </View>
      </View>
      <View className="w-full h-[100px] mt-2 ">
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="text-gray-dark"
        >
          Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1)
          est, en imprimerie, une suite de mots sans signification utilisée à
          titre provisoire pour calibrer une mise en page, le texte définitif
          venant remplacer le faux-texte dès qu'il est prêt ou que la mise en
          page est achevée. Généralement, on utilise un texte en faux latin (le
          texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum.
          L'avantage du latin est que l'opérateur sait au premier coup d'œil que
          la page contenant ces lignes n'est pas valide et que l'attention du
          lecteur n'est pas dérangée par le contenu, lui permettant de demeurer
          concentré sur le seul aspect graphique. Il circule des centaines de
          versions différentes du lorem ipsum, mais ce texte aurait
          originellement été tiré de l'ouvrage écrit par Cicéron en 45 av.
          J.-C., De finibus bonorum et malorum (Liber Primus, 32), texte
          populaire à cette époque, dont l'une des premières phrases est : «
          Neque porro quisquam est qui dolorem ipsum quia dolor sit{" "}
        </Text>
      </View>

      <View className="w-full h-[100px] flex flex-row  mt-3">
        <View className="w-2/5">
          <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}
          >
            <Marker title={user.attributes?.usename} coordinate={mapRegion} />
          </MapView>
        </View>
        <View
          className="w-3/5  px-2 py-2
        "
        >
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-[20px] w-full"
          >
            My localisation
          </Text>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
          >
            Douala cameroun
          </Text>
          <Pressable className="flex flex-row justify-start items-center">
            <Text
              style={{
                fontFamily: "sharp-sans",
              }}
              className="mt-2 text-indigo600 "
            >
              Open on Google Maps
            </Text>
            <Feather name="arrow-up-right" size={8} color="black" />
          </Pressable>
        </View>
      </View>
      <View className="flex flex-row">
        <Pressable onPress={()=>navigation.navigate("DoctorNote" , {user:user})} className=" w-[85%] mt-3 rounded-xl flex justify-center items-center   px-2 py-4 bg-primary ">
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-white"
          >
            Create appointment
          </Text>
        </Pressable>
      <Pressable onPress={startChannel} className=" flex justify-center items-center w-[15%]  px-2 py-4 mt-3 ml-2 rounded-xl bg-primary " ><Ionicons name="ios-chatbubble-ellipses-sharp" size={24} color="white" /></Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;
