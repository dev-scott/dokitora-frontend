import { View, Text, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// import { getDoctorUsers } from "../../utils/api";
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
import DeliveryListItem from "../../components/UI/DeliveryListItem";
import { getListDeliveries } from "../../utils/api";

const DeliveryList = () => {
  const [searchInput, setSearchInput] = useState();

  const [deliveries, setDeliveries] = useState([]);

  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

  useEffect(() => {
    getDeliveries();
  }, []);

  const getDeliveries = async () => {
    const result = (await getListDeliveries()).data;

    const resp = result.data;

    console.log(resp);
    setDeliveries(resp);
  };

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
            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
      </View>
      <FlatList
        className="mt-3"
        data={deliveries}
        renderItem={({ item }) => <DeliveryListItem delivery={item} />}
      />
    </SafeAreaView>
  );
};

export default DeliveryList;
