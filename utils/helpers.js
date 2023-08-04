import AsyncStorage from "@react-native-async-storage/async-storage";


export const getToken = () => {
    return token = AsyncStorage.getItem("token")
  };