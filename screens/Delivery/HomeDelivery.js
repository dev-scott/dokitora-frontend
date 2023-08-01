import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { assets } from "../../constants";
import MCategories from "../../components/DeliveryFlow/MCategories";
import FeaturedRow from "../../components/DeliveryFlow/FeaturedRow";
import { featured } from "../../constants/dummyData";
import { getPharmacy } from "../../utils/api";

const HomeDelivery = () => {

  // const [pharmacyData , setPharmacyData] = useState([])

  const navigation = useNavigation();

  const Search = assets.Search;
  const Cart = assets.Cart;

  const openDrawer = () => {
    navigation.openDrawer();
  };



  // useEffect(()=>{

  //   // const data = getPharmacyData()

  //   // setPharmacyData(data)
  //   // console.log(data)

  //   getPharmacy().then(data=>{
  //     // console.log(data.data)

  //     setPharmacyData(data.data)

  //     console.log(pharmacyData)
  //   })


  // },[])


  // async function getPharmacyData() {
  //   // console.log(enteredEmail, enterePassword);

  //   // setIsAuthenticating(true);
  //   try {
  //     const data = await getPharmacy();
  //     // console.log(data.data)
  //     return data

  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert(
  //       "Failed to get Pharmacy",
  //       "Please try later."
  //     );
  //     // setIsAuthenticating(false);
  //   }
  // }

  return (
    <SafeAreaView className="  flex-1 relative px-[16px] pt-[44px] pb-8 ">
      <StatusBar barStyle="dark-content" />

      <View className="mt-3 flex items-end ">
        <View className="flex items-center justify-center relative bg-white rounded-full h-7 w-7 ">
          <View className="absolute z-10 bg-pink w-2 h-2 rounded-full -right-1 -top-1"></View>
          <Cart className="text-white" />
        </View>
      </View>

      <View className="flex-row items-center mt-5  pb-2 ">
        <View className="flex-row flex-1 items-center p-1 rounded-xl border bg-white border-gray-300">
          <Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Resturants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            {/* <Icon.MapPin height="20" width="20" stroke="gray" /> */}
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <MCategories />

        {/* Featured */}

        <View className="mt-5">
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDelivery;
