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
import { login } from "../utils/auth";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const navigation = useNavigation();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enterePassword, setEnteredPassword] = useState("");

  const Password = assets.Password;

  const Person = assets.Person;

  const Correct = assets.Correct;

  const LogoIcon = assets.LogoIcon;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  const authCtx = useContext(AuthContext);

  function submitEmail() {
    // console.log( enteredEmail )

    const email = enteredEmail.trim();

    const emailIsValid = email.includes("@");

    const passwordIsValid = enterePassword;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    authCtx.email = enteredEmail;
    authCtx.password = enterePassword;

    // navigation.navigate("EmailRegistration")

    signupHandler({ enteredEmail, enterePassword });

    // console.log(enteredEmail , enterePassword)
  }

  async function signupHandler({ enteredEmail, enterePassword }) {
    // console.log(enteredEmail, enterePassword);

    setIsAuthenticating(true);
    try {
      const response = await login(enteredEmail, enterePassword);
      const token = response.data.jwt;
      authCtx.authenticate(token);
      const user = response.data.user

      // console.log(token)
      authCtx.updateUserInfo(user.username)
      authCtx.updateUserEmail(user.email)
      

    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  function submitForgot() {
    navigation.navigate("ForgotPassword");
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Login user..." />;
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
          Connectez vous a votre compte
        </Text>
        <Text className="text-zin800 text-opacity-80 text-[16px] font-normal leading-normal">
          Nous avons besoin de vos parametres de connexion pour continuer.
        </Text>
        <View className="mt-[32px]">
          <MainInput
            textInputConfig={{
              keyboardType: "default",
              placeholder: "Votre numero de téléphone ou email ?",
              // value: "Quelle est ",
            }}
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
          >
            <Person />
          </MainInput>
          <View className="mt-[16px]">
            <MainInput
              textInputConfig={{
                keyboardType: "default",
                placeholder: "Votre mot de passe ?",
                // value: "Quelle est ",
              }}
              onUpdateValue={updateInputValueHandler.bind(this, "password")}
            >
              <Password />
            </MainInput>
          </View>

          <Pressable onPress={submitForgot}>
            <Text className="font-normal text-center text-pink600 underline text-[12px] leading-none mt-[16px] mb-[64px]  ">
              J’ai oublié mon mot de passe
            </Text>
          </Pressable>
        </View>
      </View>
      <MainButton
        text="Continuer"
        color="primary"
        icon="LogoIcon"
        iconName="phone"
        colorIcon="primary"
        onPress={submitEmail}
        style="mb-[35px]"
      >
        <AntDesign name="arrowright" size={24} color="#4B33E5" />
      </MainButton>
    </SafeAreaView>
  );
};

export default LoginScreen;
