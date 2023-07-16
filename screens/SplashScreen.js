import { View, SafeAreaView, Text, ImageBackground, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants";
import { assets } from "../constants";
import { MotiView } from "moti";
// import { Center, Square, Circle } from 'native-base';

const Logo = assets.Logo;

const SplashScreen = () => {
  return (
    <View className={` flex-1 bg-primary justify-center items-center`}>
      <MotiView
        from={{
          transform: [{ scale: 0 }],
        }}
        animate={{
          transform: [{ scale: 1 }],
        }}
        transition={{
          loop: true,
          type: "timing",
          duration: 2000,
          iterationCount: -1,
        }}
      >
   <Logo/>
      </MotiView>
    </View>
  );
};

export default SplashScreen;
