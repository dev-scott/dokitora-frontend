import {
  View,
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { assets } from "../constants";
import MainInput from "../components/UI/MainInput";
import { MaterialIcons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-modern-datepicker";
import MainButton from "../components/UI/MainButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Button,
  Modal,
  FormControl,
  Input,
  Radio,
  Stack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { AuthContext } from "../store/AuthContext";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import DateTimePicker from "../components/UI/DateTimePicker";

// import Close from "../assets/icons/Close.svg";

const Close = assets.Close;

const Info = assets.Info;

const Phone = assets.Phone;

const DateIcon = assets.DateIcon;

const Password = assets.Password;

const ArrowLeft = assets.ArrowLeft;

const EmailRegistration = ({navigation}) => {



  const [showModal, setShowModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // console.log(autCtx.email)


  const [dateNaissance, setDateNaissance] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "dateNaissance":
        setDateNaissance(enteredValue);
      case "password":
        setPassword(enteredValue);
        break;
      case "confirmPassword":
        setConfirmPassword(enteredValue);
        break;
      case "gender":
        setGender(enteredValue);
    }
  }

  function submitForm() {
    const passwordAreEqual = password === confirmPassword;

    console.log(password);
    console.log(confirmPassword);

    if (!passwordAreEqual) {
      Alert.alert("Password are not equal");
      return;
    }

    signupHandler({
      username,
      email,
      date,
      gender,
      password,
      confirmPassword,
    });
  }

  const username = authCtx.username;

  const email = authCtx.email;

  const date = authCtx.date;

  async function signupHandler({ username, email , date, password }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(username, email , date, password);

      const token = response.data.jwt;

      const user = response.data.user

      console.log(token)
      authCtx.authenticate(token);
      authCtx.updateUserInfo(user.username)

      // authCtx.username = user.username
      // console.log(user.username)
      // setIsAuthenticating(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }



  return (
    <SafeAreaView className=" px-[16px] flex-1">

<KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : null}
        enableOnAndroid
        extraHeight={Platform.select({ android: 200 })} // Ajustez cette valeur en fonction de vos besoins
        style={{ flex: 1 }}
      >


      <View className="  flex  w-full h-auto flex-row items-center justify-between pt-[42px]">
        <Pressable onPress={()=>navigation.goBack()} >
          <ArrowLeft />
        </Pressable>

        <Pressable
          onPress={() => setShowModal(true)}
          className=" flex flex-row items-center justify-around w-[118px] h-8 pl-1 pr-2 py-1 rounded-xl bg-indigo50  border  border-indigo500   "
        >
          <Info />
          <Text className="text-black ml-2 text-[12px] font-normal">
            Obtenir de l'aide
          </Text>
        </Pressable>
      </View>

      <Text     style={{
          fontFamily: "sharp-sans",
        }} className="  mt-[80px] text-center leading-10 font-normal text-[32px]  text-zin900  ">
        Dites nous un peu plus sur vous. {username}
      </Text>

      <Text className=" mt-[32px] leading-none font-normal text-[16px] text-zin800 text-center">
        Dokitor a besoin de mieux vous connaitre pour configurer votre profil.
      </Text>

  
  <DateTimePicker/>
    

      <View className=" mt-[24px]">
        <Text className="font-normal text-[13px] text-zin500 text-center ">
          Êtes vous ?
        </Text>
        <Radio.Group
          name="exampleGroup"
          defaultValue="1"
          accessibilityLabel="pick a size"
          className="mt-[16px] "
        >
          <Stack
            direction={{
              base: "row",
              md: "row",
            }}
            alignItems={{
              base: "center",
              md: "center",
            }}
            justifyContent={{
              base: "center",
              md: "center",
            }}
            space={4}
            w="100%"
            // maxW="300px"
          >
            <Radio value="Homme" colorScheme="red" size="sm" my={1}>
              Un homme
            </Radio>
            <Text>Ou</Text>
            <Radio value="Femme" colorScheme="green" size="sm" my={1}>
              Une femme
            </Radio>
          </Stack>
        </Radio.Group>
      </View>

      <View>
        <Text className="text-zin500 font-normal text-[13px] text-center mt-[24px] mb-[16px]">
          Choisissez un mot de passe
        </Text>

        <MainInput
          textInputConfig={{
            keyboardType: "default",
            placeholder: "Entrer le mot de passe de votre choix",
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
              placeholder: "Confirmer votre mot de passe",
              // value: "Quelle est ",
            }}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            className="mt-[24px]"
          >
            <Password />
          </MainInput>
        </View>
      </View>

      <Pressable className="mt-[16px]">
        <MainButton
          text="Demmarer avec Dokitor"
          color="primary"
          icon="LogoIcon"
          onPress={submitForm}
          iconName="arrow-right"
        >
          <Image
            source={assets.Just}
            accessibilityLabel="Image du onboading"
            size="sm"
          />
        </MainButton>
      </Pressable>






      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          maxWidth="400px"
          className="bg-white p-6 w-[328px] h-[354px]  rounded-3xl flex flex-col justify-between items-start     "
        >
          <View className="flex w-full flex-row justify-between items-center">
            <Pressable>
              <Info width={24} height={24} />
            </Pressable>

            <Pressable onClose={() => setShowModal(false)}>
              <Close width={32} height={32} />
            </Pressable>
          </View>

          <View className="w-full">
            <Text className="text-primary text-[16px] font-normal leading-tight w-[140px] ">
              Quel probleme rencontrez-vous ?
            </Text>

            <Text className="text-zin800 text-[12px] font-normal underline leading-none mt-[24px] ">
              Je ne reçois pas de code
            </Text>
            <Text className="text-zin800 text-[12px] font-normal underline leading-none mt-[16px] ">
              Ce n’est pas mon numero{" "}
            </Text>
            <Text className="text-zin800 text-[12px] font-normal underline leading-none mt-[16px] ">
              Le code que j’ai reçu ne fonctionne pas
            </Text>
            <Text className="text-zin800 text-[12px] font-normal underline leading-none mt-[16px] ">
              Je veux obtenir de l’aide
            </Text>
          </View>

          <Pressable
            onPress={() => setShowModal(true)}
            className=" flex flex-row items-center justify-around w-[118px] h-8 pl-1 pr-2 py-1 rounded-xl bg-indigo50  border  border-indigo500 mt-[34px]   "
          >
            {/* <Image source={assets.BadgeConnect} /> */}
            <Phone />
            <Text className="text-black text-[12px] font-normal ml-[8px]">
              Appelez-nous
            </Text>
          </Pressable>
        </Modal.Content>
      </Modal>






      </KeyboardAwareScrollView>




    </SafeAreaView>
  );
};

export default EmailRegistration;
