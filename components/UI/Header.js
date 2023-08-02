import { View, Text, Pressable } from "react-native";
import React from "react";
import { assets } from "../../constants";

const Profil = assets.Profil;

const LogoIcon = assets.LogoIcon;

const Bell = assets.Bell;

const Header = ({logout , navigation , openDrawer}) => {
  return (
    <View className="flex w-full items-center justify-between flex-row ">
      <Pressable onPress={logout}>
        <LogoIcon color="white" width={19} height={32} />
      </Pressable>

      <Pressable className="  w-[183px] h-10  bg-white20  flex flex-row items-center   px-[12px] py-[12px]    rounded-3xl">
        <Bell />

        <Text className=" text-white text-xs font-normal ">
          {" "}
          Vous avez +9 notifications{" "}
        </Text>
      </Pressable>

      <Pressable onPress={openDrawer} >
            <Profil className="" width={40} height={40} />
          </Pressable>
    </View>
  );
};

export default Header;
