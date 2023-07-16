import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen1 from "../screens/OnboardingScreen/OnboardingScreen1";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OnboardingScreen2 from "../screens/OnboardingScreen/OnboardingScreen2";
import OnboardingScreen3 from "../screens/OnboardingScreen/OnboardingScreen3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegistrationType from "../screens/RegistrationType";
import EnterEmail from "../screens/EnterEmail";
import EmailRegistration from "../screens/EmailRegistration";
import ForgotPassword from "../screens/ForgotPassword";
import NewPassword from "../screens/NewPassword";
import OnboardingScreen4 from "../screens/OnboardingScreen/OnboardingScreen4";
import EnterNumber from "../screens/OTP/EnterNumber";
import OtpVerification from "../screens/OTP/OtpVerification";
import CompleteRegistration from "../screens/OTP/CompleteRegistration";
import { NavigationContainer } from "@react-navigation/native";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunch").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunch", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>

    <Stack.Navigator>
      {!isFirstLaunch && (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding1"
            component={OnboardingScreen1}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding2"
            component={OnboardingScreen2}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding3"
            component={OnboardingScreen3}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding4"
            component={OnboardingScreen4}
          />
        </>
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegistrationType"
        component={RegistrationType}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EnterNumber"
        component={EnterNumber}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OtpVerification"
        component={OtpVerification}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CompleteRegistration"
        component={CompleteRegistration}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EnterEmail"
        component={EnterEmail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EmailRegistration"
        component={EmailRegistration}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />

<Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
<Stack.Screen
        options={{ headerShown: false }}
        name="NewPassword"
        component={NewPassword}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
    </NavigationContainer>

  );
};

export default AuthStack;
