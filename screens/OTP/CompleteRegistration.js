import {
  View,
  Alert,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { assets } from "../../constants";
import MainInput from "../../components/UI/MainInput";
import { MaterialIcons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MainButton from "../../components/UI/MainButton";

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
import { AuthContext } from "../../store/AuthContext";
import { createUser, updateAccount } from "../../utils/auth";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

// import Close from "../assets/icons/Close.svg";

const Close = assets.Close;

const Info = assets.Info;

const Phone = assets.Phone;

const DateIcon = assets.DateIcon;

const Password = assets.Password;

const ArrowLeft = assets.ArrowLeft;

const CompleteRegistration = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // console.log(autCtx.email)

  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

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
      phone,
      dateNaissance,
      gender,
      password,
      confirmPassword,
    });
  }



  const phone = authCtx.phone;

  async function signupHandler({ phone, password }) {



    setIsAuthenticating(true);
    try {
      const token = await updateAccount(phone, password);
      console.log(token);
      authCtx.authenticate(token);
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
      <View className="  flex  w-full h-auto flex-row items-center justify-between pt-[42px]">
        <Pressable onPress={() => navigation.goBack()}>
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

      <Text
        style={{
          fontFamily: "sharp-sans",
        }}
        className="  mt-[80px] text-center leading-10 font-normal text-[32px]  text-zin900  "
      >
        Dites nous un peu plus sur vous.
      </Text>

      <Text className=" mt-[32px] leading-none font-normal text-[16px] text-zin800 text-center">
        Dokitor a besoin de mieux vous connaitre pour configurer votre profil.
      </Text>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spimner"
          value={date}
          onChange={onChange}
        />
      )}

      {!showPicker && (
        <Pressable className="mt-[32px]" onPress={toggleDatepicker}>
          <MainInput
            textInputConfig={{
              keyboardType: "default",
              placeholder: "Sat Aug 21 2004",
              // value: "Quelle est ",
            }}
            onUpdateValue={updateInputValueHandler.bind(this, "dateNaissance")}
          >
            <DateIcon />
          </MainInput>
        </Pressable>
      )}

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
    </SafeAreaView>
  );
};

export default CompleteRegistration;
