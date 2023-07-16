import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { assets } from "../constants";
import MainButton from "../components/UI/MainButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import MainInput from "../components/UI/MainInput";
import { forgotPassword, resetPassword } from "../utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";

const ForgotPassword = ({ navigation }) => {
  const LogoIcon = assets.LogoIcon;

  const Person = assets.Person;

  const [enteredEmail, setEnteredEmail] = useState("");
  const [entereUsername, setEnteredUsername] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
    }
  }


  const authCtx = useContext(AuthContext);


  function submitForm() {
    const email = enteredEmail.trim();

    const emailIsValid = email.includes("@");


    if (!emailIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    authCtx.email=enteredEmail

    ForgotPasswordHandler({ email });
  }

  async function ForgotPasswordHandler({ email }) {
    setIsAuthenticating(true);

    try {
      const response = await forgotPassword(email);

      console.log(response);

      navigation.navigate("NewPassword");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Could not find user",
        "Could not find your account check your input and try again later."
      );

      setIsAuthenticating(false);
    }
  }


  if (isAuthenticating) {
    return <LoadingOverlay message="Finding account..." />;
  }

  return (
    <SafeAreaView className=" px-[16px] flex-1 flex justify-between ">
      <View className="  flex  w-full h-auto flex-row items-center justify-between pt-[42px]">
        <LogoIcon width={19} height={32} />
        <Pressable
          onPress={() => {
            navigation.navigate("EnterEmail");
          }}
          className=" flex flex-row items-center justify-around w-[118px] h-8 pl-1 pr-2 py-1 rounded-xl bg-indigo50  border  border-indigo500   "
        >
          <Image source={assets.BadgeConnect} />
          <Text className="text-black text-[12px] font-normal">S'inscrire</Text>
        </Pressable>
      </View>

      <View className="">
        <Text     style={{
          fontFamily: "sharp-sans",
        }} className="leading-10 font-normal text-[32px] text-zin900 text-center ">
          Vous avez oublié votre mot de passe ?
        </Text>

        <Text className="mt-[16px] text-center text-zin800 ">
          Essayons ensemble de recuperer votre mot de passe
        </Text>

        <Text className="mt-[32px] text-center font-normal text-[13px] text-zin500">
          Quel est l'adresse email  associer a
        </Text>

        <Text className="mt-[5px] text-center font-normal text-[13px] text-zin500">
          votre compte
        </Text>

        <MainInput
          textInputConfig={{
            keyboardType: "default",
            placeholder: "Quelle est votre adresse email ?",
            // value: "Quelle est ",
          }}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          style="mt-[16px]"
        >
          <Person />
        </MainInput>
      </View>

      <MainButton
        text="Verifier mon compte"
        color="primary"
        icon="LogoIcon"
        iconName="phone"
        colorIcon="primary"
        style="mb-[35px]"
        onPress={submitForm}
      >
        <AntDesign name="arrowright" size={24} color="#4B33E5" />
      </MainButton>
    </SafeAreaView>
  );
};

export default ForgotPassword;
