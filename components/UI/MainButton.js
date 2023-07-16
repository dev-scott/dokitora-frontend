import { View, Pressable, Text, Image } from "react-native";
import React, { Children } from "react";
import { assets } from "../../constants";
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 


const MainButton = ({ style , text, color, icon , colorIcon , iconName , onPress , children }) => {
  console.log(icon);
  // const MyIcon= icon
  return (
    <Pressable onPress={onPress} className={`p-3 flex ${style} items-center bg-black bg-${color}   w-full h-14 rounded-2xl flex-row justify-between`}>
      <Text className="text-white text-[16px]   font-normal  ">
        {text}
      </Text>

      <View className="flex justify-center items-center rounded-full w-8 h-8 bg-white">

      {/* <Feather name="phone" size={24} color='blue' className="text-primary" /> */}

{children}

      </View>

      {/* <Image source={assets.LogoIcon} className="w-8 h-8 object-fill " /> */}
    </Pressable>
  );
};

export default MainButton;
