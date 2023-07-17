import {
  View,
  Alert,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
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

const EnterEmail = () => {
  const LogoIcon = assets.LogoIcon;

  const Person = assets.Person;

  const Email = assets.Email;

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const navigation = useNavigation();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [entereUsername, setEnteredUsername] = useState("");

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

  function submitEmail() {
    const email = enteredEmail.trim();

    const emailIsValid = email.includes("@");

    const usernameIsValid = entereUsername;

    if (!emailIsValid || !usernameIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    authCtx.email = enteredEmail;
    authCtx.username = entereUsername;

    navigation.navigate("EmailRegistration");
  }

  return (
    <SafeAreaView className=" px-[16px] flex-1 flex justify-between ">
     
     <KeyboardAvoidingView
        className="flex-1"
        // enabled
        // behavior={"padding"}
        // className=" flex-1 w-full h-full"
      >
        <ScrollView
          className="flex-1"
          pagingEnabled
          showsHorizontalScrollIndicator={true}

          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"

        >
     
     
      <View className=" mb-[160px] mt-[42px] flex  w-full h-auto flex-row items-center justify-between ">
        <LogoIcon width={19} height={32} />
      </View>
      <View>
        <Text className="mb-[16px] text-zin900 text-[32px] font-normal leading-10">
          Quel est votre email ? {entereUsername}
        </Text>
        <Text className="text-zin800 text-opacity-80 text-[16px] font-normal leading-normal">
          Nous avons besoin de votre email pour créer votre compte.{" "}
        </Text>
      </View>


          <View className="mt-[32px]">
            <MainInput
              textInputConfig={{
                keyboardType: "default",
                placeholder: "Quelle est votre nom ?",
                // value: "Quelle est ",
              }}
              onUpdateValue={updateInputValueHandler.bind(this, "username")}
            >
              <Person />
            </MainInput>
            <View className="mt-[16px]">
              <MainInput
                textInputConfig={{
                  keyboardType: "default",
                  placeholder: "Quelle est votre email ?",
                  // value: "Quelle est ",
                }}
                onUpdateValue={updateInputValueHandler.bind(this, "email")}
              >
                <Email />
              </MainInput>
            </View>

            <Text className="font-normal text-zin800 text-[12px] leading-none mt-[64px] mb-[64px]  ">
              Ces informations, ainsi que les données personnelles que vous
              partagerez avec nous resterons confidentiels selon l’avis de
              confidentialité de Dokitora.
            </Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterEmail;
