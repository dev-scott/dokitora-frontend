import { View, Text, SafeAreaView , Image } from "react-native";
import React, { useEffect } from 'react'
// import * as Animatable from 'react-native-animatable';
// import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
const PreparingOrder = () => {

    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Delivery');
        },3000);
    },[])

  return (
    <SafeAreaView
      className="bg-white flex-1 justify-center items-center relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
              <Image source={require('../../assets/images/delivery.gif')} className="h-80 w-80" />

      
    </SafeAreaView>
  );
};

export default PreparingOrder;
