import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderCard = ({
name,
phone,
date,
email,
pharmacy_name,
order_price

}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className=" flex flex-row justify-between items-center mr-6 bg-white w-full h-14 mb-3 p-3 rounded-[5px] shadow-lg"
      onPress={() => {
        navigation.navigate("PharmacyDetail", {
            name,
            phone,
            date,
            email,
            pharmacy_name,
            order_price
        });
      }}
    >
      <View className="flex flex-col">
        <Text     style={{
          fontFamily: "sharp-sans",
        }} >{pharmacy_name}</Text>
        <Text  >{date}</Text>
       
      </View>
      <View>
        <Text className="text-green600" >${order_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
