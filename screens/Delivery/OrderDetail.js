import { View, Text, Button } from "react-native";
import React from "react";

import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useRoute } from "@react-navigation/native";
import { assets } from "../../constants";

const OrderDetail = (route) => {
  const {
    params: {
      id,
      name,
      phone,
      date,
      email,
      pharmacy_name,
      order_price,
      onder_confirm,
      order_pharmacy_number,
    },
  } = useRoute();

  const item = {
    id,
    name,
    phone,
    date,
    email,
    pharmacy_name,
    order_price,
    onder_confirm,
    order_pharmacy_number,
  };

  // const html = `
  //   <html>
  //     <body>
  //       <h1>Hi sado </h1>
  //       <p style="color: red;">Hello. Bonjour. Hola.</p>
  //     </body>
  //   </html>
  // `;

  // let generatePdf = async () => {
  //   const file = await printToFileAsync({
  //     html: html,
  //     base64: false,
  //   });

  //   // await shareAsync(file.uri);

  //   const fileUri = `${FileSystem.documentDirectory}order.pdf`;

  //   await FileSystem.moveAsync({
  //     from: file.uri,
  //     to: fileUri,
  //   });
  // };


  const Valide = assets.Valide;
  const Erreur = assets.Erreur;


  return (
    <View className=" flex-1 relative px-[16px] pt-[44px] pb-8 ">
      <View className="w-full  border-b-2 border-gray-dark py-3">
        <Text>Order #{item.id}</Text>
      </View>
      <View className="py-4  ">
        <View className="w-full p-3 bg-indigo1 rounded-xl">
          <Text className="mb-2" >{item.name}</Text>
          <Text>{item.date}</Text>
        </View>

<View className="w-full p-4  rounded-xl flex flex-row justify-between items-center " >
  <Text>{item.pharmacy_name}</Text>
  <Text>{item.order_pharmacy_number}</Text>

</View>
<View className="w-full p-4 bg-primary rounded-xl flex flex-row justify-between items-center " >
  <Text className="text-white">Total</Text>
  <Text className="text-white" >{item.order_price}</Text>

</View>

        <View className="mt-3">
        {onder_confirm ? (
            <Valide width={49} height={42} className="ml-2" />
          ) : (
            <Erreur width={49} height={42} className="ml-2" />
          )}
        </View>

      </View>
    </View>
  );
};

export default OrderDetail;
