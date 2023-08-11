import { View, Text, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getDoctorUsers } from "../../utils/api";
import { FlatList } from "react-native";
import UserListItem from "../../components/UI/UserListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/AuthContext";
import { useChatContext } from "stream-chat-expo";
import { SafeAreaView } from "moti";
import SearchBar from "../../components/UI/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { assets } from "../../constants";

const NewChat = () => {
  const [searchInput, setSearchInput] = useState();

  const [doctor, setDoctor] = useState([]);
  const [filter , setFilter] = useState([]);
  const [search , setSearch] = useState([])

  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

  useEffect(() => {
    getUsers();
  }, []);

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

  const getUsers = async () => {
    const result = (await getDoctorUsers()).data;

    const resp = result.data;

    console.log(resp);
    setDoctor(resp);
    setFilter(resp);
  };



  const searchFilter = (value)=>{

    if(value){
      const newData = doctor.filter((item)=>{
        const itemData = item.username ? item.username.toUpperCase() : ''.toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData)>-1
      });
      setFilter(newData);
      setSearch(value);
    }else {
      setFilter(doctor);
      setSearch(value)
    }

  }


  return (
    <SafeAreaView
      className=" flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <View>
        <View
          className="bg-white"
          style={{
            display: "flex",
            marginTop: 5,
            flexDirection: "row",
            padding: 10,
            gap: 5,
            elevation: 0.7,
            alignItems: "center",

            borderRadius: 5,
          }}
        >
          <Ionicons className="bg-white" name="search" size={24} />
          <TextInput
            className="bg-white"
            placeholder="Search"
            style={{ width: "80%" }}
            value={search}
            onChangeText={(value) => searchFilter(value)}
            // onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
      </View>
      <FlatList className="mt-3"
        data={filter}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </SafeAreaView>
  );
};

export default NewChat;
