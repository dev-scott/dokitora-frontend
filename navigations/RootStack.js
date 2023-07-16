import { View, Text } from "react-native";
import  { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../store/AuthContext";


const RootStack = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated == true ? <AppStack /> : <AuthStack />}
    </>

  );
};

export default RootStack;
