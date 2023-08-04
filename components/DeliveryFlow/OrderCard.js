import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../../constants";

const OrderCard = ({
  name,
  phone,
  date,
  email,
  pharmacy_name,
  order_price,
  onder_confirm,
}) => {
  const navigation = useNavigation();

  const Valide = assets.Valide;
  const Erreur = assets.Erreur;

  return (
    <TouchableOpacity
      className=" flex flex-row justify-between items-center mr-6 bg-white w-full h-14 mb-3 p-3 rounded-[5px] shadow-lg"
      onPress={() => {
        navigation.navigate("PharmacyDetail", {
          name,
          phone,
          date,
          email,
          pharmacy_name,
          order_price,
          onder_confirm,
        });
      }}
    >
      <View className="flex flex-col">
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
        >
          {pharmacy_name}
        </Text>
        <Text>{date}</Text>
      </View>
      <View className="flex justify-center items-center flex-row ">
        <Text className="text-green600">${order_price}</Text>
        {onder_confirm ? (
          <Valide width={19} height={32} className="ml-2" />
        ) : (
          <Erreur width={19} height={32} className="ml-2" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
