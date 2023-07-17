import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../constants";
import MainButton from "../../components/UI/MainButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import MainInput from "../../components/UI/MainInput";
import { forgotPassword, resentOtp, resetPassword, verifyAccount } from "../../utils/auth";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { AuthContext } from "../../store/AuthContext";

const OtpVerification = ({ navigation }) => {




  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [myOtp, setMyOtp] = useState("");

  const LogoIcon = assets.LogoIcon;

  const Person = assets.Person;

  const Question = assets.Question;

  const Retry = assets.Retry;

  const [enteredEmail, setEnteredEmail] = useState("");
  const [entereUsername, setEnteredUsername] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [countdown, setCountdown] = useState(60);


  // const [isLocked , setIsLocked] = useState(false);


  // const [timereset , setTimeReset]=useState("30000")

  // const handlePress = ()=>{

  //   setInterval(() => {

  //     setTimeReset(timereset - 1000)


  //     return () => clearInterval(timer);
      
  //   }, 1000);

  //   if(!isLocked){
  //     setIsLocked(true);

  //     setTimeout(()=>{

  //       setIsLocked(false);

  //     },timereset)

  //   }


  // }



  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1); // Décrémente le compte à rebours chaque seconde
      }, 1000);
    }

    return () => clearInterval(timer); // Nettoyage du minuteur lorsqu'il n'est plus nécessaire

  }, [countdown]);






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
    // console.log(otp)

    const keys = Object.keys(otp).sort();
    let otpCode = "";

    for (let key of keys) {
      otpCode += otp[key];
    }

    // setOtp(otpCode)
    setMyOtp(otpCode);
    console.log(myOtp);

    if (!otp) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      return;
    }

    // console.log(otpCode)
    // authCtx.email = enteredEmail;

    verifyOtp({ myOtp });
  }

  async function verifyOtp({ myOtp }) {
    setIsAuthenticating(true);
    console.log(myOtp);

    try {
      await verifyAccount(myOtp);

      // console.log(response);

      navigation.navigate("CompleteRegistration");
    } catch (error) {
      console.log(error);

      Alert.alert("Could not find otp", "Verify your otp please.");

      setIsAuthenticating(false);
    }
  }


  function submitResentOtp(){


      const phone = authCtx.phone

      console.log(phone)
  
      updateUptCode({ phone });
  

    }


  

  async function updateUptCode ({phone}){


    setIsAuthenticating(true);

    try{

      await resentOtp(phone);

      setIsAuthenticating(false);

    }

    catch(error){

      Alert.alert("Resent otp failed");


      setIsAuthenticating(false);

      
    }
    

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Verify otp..." />;
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
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="leading-10 font-normal text-[32px] text-zin900 text-center "
        >
          Vérifier votre numéro de téléphone.
        </Text>

        <Text className="mt-[16px] text-center text-zin800 ">
          Nous vous avons envoyé un message contenant votre code de vérification
          a votre numéro 691*****56.{" "}
        </Text>

        <Text className="mt-[32px] text-center font-normal text-[13px] text-zin500">
          Entrer le code de vérification
        </Text>

        <View className="mt-[16px] flex flex-row items-center justify-evenly ">
          <View className="w-[52px] h-14 px-4 py-2 rounded-2xl border border-gray-dark justify-start items-center ">
            <TextInput
              className="text-[24px] text-black text-center "
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>

          <View className="w-[52px] h-14 px-4 py-2 rounded-2xl border border-gray-dark justify-start items-center ">
            <TextInput
              className="text-[24px] text-black text-center "
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>

          <View className="w-[52px] h-14 px-4 py-2 rounded-2xl border border-gray-dark justify-start items-center ">
            <TextInput
              className="text-[24px] text-black text-center "
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 3: text });
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>

          <View className="w-[52px] h-14 px-4 py-2 rounded-2xl border border-gray-dark justify-start items-center ">
            <TextInput
              className="text-[24px] text-black text-center "
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 4: text });
                text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        {/* <MainInput
          textInputConfig={{
            keyboardType: "default",
            placeholder: "Quelle est votre adresse email ?",
            // value: "Quelle est ",
          }}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          style="mt-[16px]"
        >
          <Person />
        </MainInput> */}
      </View>

<Pressable onPress={submitResentOtp} disabled={countdown > 0} >


      <View className="mt-[64px] mx-auto   w-full h-[92px] p-3 bg-indigo1 bg-opacity-95 rounded-2xl   flex flex-col justify-around items-end    ">
        <View className="w-full flex justify-between items-center flex-row ">
          <Question />

          <Text className="text-indigo600 text-xs leading-[18px] font-normal  ">
            Vous n’avez pas reçu votre code de vérification ?
          </Text>
        </View>

        <View className="w-[137px] h-8 px-1 py-1 bg-white rounded-2xl  flex flex-row items-center justify-center  ">
          <Retry />
          <Text className="text-black text-xs font-normal ">
            {" "}
            Réessayer ({countdown}){" "}
          </Text>
        </View>
      </View>


</Pressable>


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

export default OtpVerification;
