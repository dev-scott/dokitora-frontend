import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React from "react";
import { Button } from "native-base";
import { assets } from "../constants";
import MainButton from "../components/UI/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const LogoIcon = assets.LogoIcon

const RegistrationType = ({navigation}) => {


  const BadgeConnect = assets.BadgeConnect
  const Phone = assets.Phone
  const Email = assets.Email


  return (
    <SafeAreaView className=" px-[16px] flex-1 flex flex-col  justify-around items-center">
      <View className="  flex  w-full h-auto flex-row items-center justify-between pt-[42px]">
        {/* <Image source={assets.LogoIcon} className="w-8 h-[35.12px]" /> */}
        
        <LogoIcon width={19} height={32}/>
        
        <Pressable
          onPress={() => {
            navigation.navigate("LoginScreen")
          }}
          className=" flex flex-row items-center justify-around w-[118px] h-8 pl-1 pr-2 py-1 rounded-xl bg-indigo50  border  border-indigo500   "
        >
<BadgeConnect/>
          <Text className="text-black text-[12px] font-normal">
            Se connecter
          </Text>
        </Pressable>
      </View>

      <View className="">
        <Text     style={{
          fontFamily: "sharp-sans",
        }} className="text-zinc-900 text-[32px] mb-[32px] font-normal leading-10">
          Démmarrer avec votre Dokitora
        </Text>

        <Text className="text-zinc-900 text-opacity-80 text-[16px] font-normal leading-normal text-zin900">
          Afin d'acceder a votre Dokitor , choisissez votre mode de connexion.
        </Text>
      </View>

      <MainButton
        text="Continuer avec mon numero"
        color="primary"
        icon="LogoIcon"
        onPress={() => navigation.navigate("EnterNumber")}
        iconName="phone"
        colorIcon="primary"
      >
<Phone/>
      </MainButton>


      <MainButton
        text="Continuer avec mon email"
        color="black"
        icon="LogoIcon"
        onPress={() => navigation.navigate("EnterEmail")}
      >
       <Email/>
      </MainButton>

      <Text className=" w-full mt-[32px] text-[14px] text-zin900 font-normal leading-tight ">
        Vous pouvez également{" "}
        <Text className="underline">
          {" "}
          vous demmarer en créant un nouveau compte.
        </Text>{" "}
      </Text>

      <View className="mt-[96px]  ">
        <Text className="text-[12px] text-zin800 leading-none font-normal">
          En cliquant sur “Continuer avec mon numero/Email” ci-dessus, vous
          approuver avoir lu, compris et accepter notre{" "}
          <Text className="underline">
            {" "}
            avis de confidentialité et la règles d’utilisations.{" "}
          </Text>
        </Text>

        <View className="mt-[22px] flex flex-row items-center justify-start ">
          <Text className="text-zin800 text-[12px] font-normal leading-none mr-4">
            Avis confidentialité
          </Text>
          <Text className="text-zin800 text-[12px] font-normal leading-none mr-4">
            Regles d’utilisation
          </Text>
          <Text className="text-zin800 text-[12px] font-normal leading-none">
            Aide
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationType;
