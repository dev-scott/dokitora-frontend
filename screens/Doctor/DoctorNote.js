import { View, Text, Pressable, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";
import GoogleMapView from "../../components/UI/GoogleMapView";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Icon from "react-native-feather";
import { assets } from "../../constants";
import { useChatContext } from "stream-chat-expo";
import MainInput from "../../components/UI/MainInput";

const DoctorNote = ({ route }) => {
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


      <View className="w-full h-[200px]  mt-5" >
<Text

style={{
    fontFamily: "sharp-sans",
  }}
  className="text-gray-dark  text-[18px] "

>Le motif de rendez vous</Text>

<TextInput multiline={true} numberOfLines={4} className="  mt-4 text-[12px] font-normal text-zin800 outline-none border border-gray-dark rounded-[4px]  h-full grow shrink basis-0 " />

      </View>

      <View className="flex flex-row">
        <Pressable className=" w-full mt-3 rounded-xl flex justify-center items-center   px-2 py-4 bg-primary ">
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-white"
          >
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DoctorNote;
