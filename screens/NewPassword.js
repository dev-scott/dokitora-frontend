import {
  View,
  Pressable,
  Alert,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { assets } from "../constants";
import { Input } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MainButton from "../components/UI/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MainInput from "../components/UI/MainInput";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../store/AuthContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {  resetPassword } from "../utils/auth";

const NewPassword = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const navigation = useNavigation();

  // const [enteredPassword, setEnteredPassword] = useState("");


  const [enterPassword , setEnterPassword] = useState("")

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [resetToken , setResetToken] = useState("")

  const Password = assets.Password;

  const Person = assets.Person;

  const Correct = assets.Correct;

  const LogoIcon = assets.LogoIcon;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "password":
        setEnterPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "resetToken":
        setResetToken(enteredValue);
    }
  }

  


  const authCtx = useContext(AuthContext);

  function submitResetPassword() {
    // console.log( enteredEmail )

    const passwordIsValid =  enteredConfirmPassword;

    if (!passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    // navigation.navigate("EmailRegistration")

    resetPasswordHandler({  enterPassword , enteredConfirmPassword , resetToken });

    // console.log(enteredEmail , enterePassword)
  }

  async function resetPasswordHandler({ enterPassword ,  enteredConfirmPassword , resetToken }) {
    // console.log(enteredEmail, enterePassword);

    // console.log(email)

    console.log(enterPassword , enteredConfirmPassword , resetToken)

    setIsAuthenticating(true);
    try {
     await resetPassword( enterPassword , enteredConfirmPassword , resetToken);
      navigation.navigate("LoginScreen")
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Reset password failed",
        "Could not reset password , please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }


  if (isAuthenticating) {
    return <LoadingOverlay message="Reset password..." />;
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
          <Correct />
          <Text className="text-black text-[12px] font-normal">S'inscrire</Text>
        </Pressable>
      </View>
      <View className=" ">
        <Text     style={{
          fontFamily: "sharp-sans",
        }} className="mb-[16px] text-zin900 text-[32px] font-normal leading-10">
          Entrez un nouveau mot de passe
        </Text>
        <Text className="text-zin800 text-opacity-80 text-[16px] font-normal leading-normal">
          Nous avons besoin de vos parametres de connexion pour continuer.
        </Text>
        <View className="mt-[32px]">
          <MainInput
            textInputConfig={{
              keyboardType: "default",
              placeholder: "Votre nouveau mot de passe ?",
              // value: "Quelle est ",
            }}
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
          >
              <Password />
          </MainInput>
          <View className="mt-[16px]">
            <MainInput
              textInputConfig={{
                keyboardType: "default",
                placeholder: "Confirmer votre mot de passe ?",
                // value: "Quelle est ",
              }}
              onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
            >
              <Password />
            </MainInput>
          </View>
          <View className="mt-[16px]">
            <MainInput
              textInputConfig={{
                keyboardType: "default",
                placeholder: "entrez le token de reinitialisation ?",
                // value: "Quelle est ",
              }}
              onUpdateValue={updateInputValueHandler.bind(this, "resetToken")}
            >
              <Password />
            </MainInput>
          </View>

    
        </View>
      </View>
      <MainButton
        text="Continuer"
        color="primary"
        icon="LogoIcon"
        iconName="phone"
        colorIcon="primary"
        onPress={submitResetPassword}
        style="mb-[35px] mt-[10px]"
      >
        <AntDesign name="arrowright" size={24} color="#4B33E5" />
      </MainButton>
    </SafeAreaView>
  );
};

export default NewPassword;
