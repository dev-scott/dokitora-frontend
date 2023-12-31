import {
  View,
  Alert,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Animated
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../components/UI/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MainInput from "../../components/UI/MainInput";
import { AuthContext } from "../../store/AuthContext";
import { registerWithPhoneAndOTP } from "../../utils/auth";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Keyboard } from "react-native";


const EnterNumber = () => {



  const navigation = useNavigation();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [enteredPhone, setEnteredPhone] = useState("");
  const [entereUsername, setEnteredUsername] = useState("");

  const authCtx = useContext(AuthContext);

  const LogoIcon = assets.LogoIcon;

  const Person = assets.Person;

  const Phone = assets.Phone;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
    }
  }

  function submitForm() {
    const phone = enteredPhone;

    authCtx.phone = enteredPhone;

    const phoneValid = phone;

    const username = entereUsername;

    if (!phoneValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    authCtx.phone = enteredPhone;
    authCtx.username = entereUsername;

    signupHandler({
      username,
      phone,
    });
  }

  async function signupHandler({ username, phone }) {
    setIsAuthenticating(true);

    try {
      const token = await registerWithPhoneAndOTP(username, phone);

      navigation.navigate("OtpVerification");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }



  

  return (
    // <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>

    <SafeAreaView className=" px-[16px] flex-1 ">
 
        <KeyboardAwareScrollView 


          enableOnAndroid
          extraHeight={Platform.select({ android: 300 })} // Ajustez cette valeur en fonction de vos besoins
        
        style={{ flex: 1 }}
        
        >
          <View className=" mb-[160px] mt-[42px] flex  w-full h-auto flex-row items-center justify-between ">
            {/* <Image source={assets.LogoIcon} className="w-8 h-[35.12px]" /> */}
            <LogoIcon width={19} height={32} />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "sharp-sans",
              }}
              className="mb-[16px] text-zin900 text-[32px] font-normal leading-10"
            >
              Démmarrer avec votre Dokitora
            </Text>
            <Text className="text-zin800 text-opacity-80 text-[16px] font-normal leading-normal">
              Afin d’acceder à votre Dokitor, choisissez votre mode de
              connexion.
            </Text>
            <View className="mt-[32px]">
              {/* <Input
            className=" w-[327px] h-[48px] "
            InputLeftElement={
              <Ionicons
                className="ml-4"
                name="person"
                size={20}
                color="black"
              />
            }
            placeholder="Name"
          /> */}

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
                    keyboardType: "decimal-pad",
                    placeholder: "Quelle est votre numero de telephone ?",
                    // value: "Quelle est ",
                  }}
                  onUpdateValue={updateInputValueHandler.bind(this, "phone")}
                >
                  <FontAwesome name="phone" size={24} color="black" />
                </MainInput>
              </View>

              <Text className="font-normal text-zin800 text-[12px] leading-none mt-[64px] mb-[64px]  ">
                Ces informations, ainsi que les données personnelles que vous
                partagerez avec nous resterons confidentiels selon l’avis de
                confidentialité de Dokitora.
              </Text>
            </View>

            <MainButton
              text="Verifier mon numero"
              color="primary"
              icon="LogoIcon"
              onPress={submitForm}
              iconName="phone"
              colorIcon="primary"
            >
              <Phone />
            </MainButton>
          </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EnterNumber;
