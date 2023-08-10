import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
// import { selectmyOrder, setMyOrder } from "../../slices/orderSlice";
import { Feather } from "@expo/vector-icons";

const OrderCard = ({
  id,
  name,
  phone,
  date,
  email,
  pharmacy_name,
  order_price,
  onder_confirm,
  order_pharmacy_number,
}) => {
  const navigation = useNavigation();

  // const orderTerst = useSelector(selectmyOrder)

  const dispatch = useDispatch();

  const Valide = assets.Valide;
  const Erreur = assets.Erreur;

  const item = {
    id,
    name,
    phone,
    date,
    email,
    pharmacy_name,
    order_price,
    onder_confirm,
  };

  // useEffect(()=>{

  //   if(item && item.id){

  //       dispatch(setMyOrder({...item}))

  //   }

  // })

  return (
    <TouchableOpacity
      className=" flex flex-col justify-between items-center mr-6 bg-white w-full h-24 mb-3 p-3 rounded-[5px] shadow-lg"
      onPress={() => {
        navigation.navigate("OrderDetail", {
          id,
          name,
          phone,
          date,
          email,
          pharmacy_name,
          order_price,
          onder_confirm,
          order_pharmacy_number,
        });
      }}
    >
      <View className=" flex flex-row justify-between items-center w-full ">
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
          {/* <Text className="text-green600">${orderTerst.date}</Text> */}
          {onder_confirm ? (
            <Valide width={19} height={32} className="ml-2" />
          ) : (
            <Erreur width={19} height={32} className="ml-2" />
          )}
        </View>
      </View>

      <View className="border-t-2 border-opacity-5 border-t-gray-dark w-full pt-1 flex flex-row items-center justify-between ">
        <Text>{email}</Text>
        <Feather name="arrow-right" size={20} color="#273444" />
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
