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

const OrderCard = ({
    id,
  name,
  phone,
  date,
  email,
  pharmacy_name,
  order_price,
  onder_confirm,
}) => {
  const navigation = useNavigation();

  // const orderTerst = useSelector(selectmyOrder)

  const dispatch = useDispatch()

  const Valide = assets.Valide;
  const Erreur = assets.Erreur;

  const item = { id,name , phone , date , email , pharmacy_name , order_price , onder_confirm}


  // useEffect(()=>{

  //   if(item && item.id){

  //       dispatch(setMyOrder({...item}))
        
  //   }

  // })

  return (
    <TouchableOpacity
      className=" flex flex-row justify-between items-center mr-6 bg-white w-full h-14 mb-3 p-3 rounded-[5px] shadow-lg"
      onPress={() => {
        navigation.navigate("PharmacyDetail", {
            id,
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
        {/* <Text className="text-green600">${orderTerst.date}</Text> */}
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
