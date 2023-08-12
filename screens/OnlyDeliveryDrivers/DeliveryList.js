import { View, Text, TextInput, ScrollView } from "react-native";
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
import Header from "../../components/UI/Header";

const DeliveryList = ({navigation}) => {
  const [searchInput, setSearchInput] = useState();

  const [deliveries, setDeliveries] = useState([]);
  const [deliveriesFilter , setDeliveriesFilter] = useState([]);
  const [search , setSearch]= useState('');


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
    setDeliveriesFilter(resp);
  };


  
  const searchFilter = (value)=>{

    if(value){
      const newData = deliveries.filter((item)=>{
        const itemData = item.attributes.name ? item.attributes.name.toUpperCase() : ''.toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData)>-1
      });
      setDeliveriesFilter(newData);
      setSearch(value);
    }else {
      setDeliveriesFilter(deliveries);
      setSearch(value)
    }

  }

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView
      className=" bg-primary flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >

<Header openDrawer={openDrawer}  />


<View className="mt-5" >
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





      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-hidden py-5"
      >

{deliveriesFilter.map((delivery , index)=>(
            <DeliveryListItem key={index} name={delivery.attributes.name} phone={delivery.attributes.phone} date={delivery.attributes.date} email={delivery.attributes.email} pharmacy_name={delivery.attributes.pharmacy_name} order_price={delivery.attributes.order_price} onder_confirm={delivery.attributes.confirmed} id={delivery.attributes.id} order_pharmacy_number={delivery.attributes.order_pharmacy_number} />
          // <Text>{delivery.attributes.name}</Text>
          ))}



</ScrollView>


 
    </SafeAreaView>
  );
};

export default DeliveryList;
