import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import MainButton from "../../components/UI/MainButton";
import { assets } from "../../constants";
import { Feather } from "@expo/vector-icons";

const OnboardingScreen3 = ({ navigation }) => {

  const PersonOnboading3 = assets.PersonOnboading3

  const LogoIcon = assets.LogoIcon;


  return (
    <SafeAreaView className="flex-1 bg-white flex flex-col justify-around items-center pt-[42px] pb-16px px-8  ">
      <LogoIcon/>
      <Text     style={{
          fontFamily: "sharp-sans",
        }}
         className=" text-center text-black text-[32px] font-normal leading-10">
        Confiez-nous votre ordonnance.
      </Text>

      <View className="w-[284.34px] h-[391.69px]   flex justify-center items-center relative">
        {/* <Image
          source={assets.PersonOnboading3}
          accessibilityLabel="Image du onboading"
          resizeMode="cover"
        /> */}

<PersonOnboading3/>

      </View>

      <MainButton
        text="Demmarer avec Dokitor"
        color="primary"
        icon="LogoIcon"
        iconName="arrow-right"
        onPress={() => navigation.navigate("Onboarding4")}
      >
        <Feather
          name="arrow-right"
          size={24}
          color="blue"
          className="text-primary"
        />
      </MainButton>
    </SafeAreaView>
  );
};

export default OnboardingScreen3;
