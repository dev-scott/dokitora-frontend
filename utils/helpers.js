import AsyncStorage from "@react-native-async-storage/async-storage";


export  const getToken = async () => {
    return token = await AsyncStorage.getItem("token")
  };