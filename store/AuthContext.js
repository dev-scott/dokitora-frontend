import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "../screens";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  isLoading: false,
  username:"",
  email:"",
  password: "",
  phone:"",
  adresse:"",
  date:"",
  role:"",
  updateUserInfo:(username)={},
  updateUserEmail:(email)={},


});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isLoadingAuth, setIsLoadingAuth] = useState();
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  const [username , setUsername]= useState("")
  const [email , setEmail]= useState("")
  const [password , setPassword]= useState("")
  const [phone , setPhone]= useState("")
  const [adresse , setAdresse]= useState("")
  const [date , setDate]= useState("")
  const [role , setRole]= useState("")


  function authenticate(token) {
    setIsLoadingAuth(true);
    setAuthToken(token);
    AsyncStorage.setItem("token", JSON.stringify(token) );

    setIsLoadingAuth(false);
  }

  function updateUserInfo(username){
    setUsername(username);
  }

  function updateUserEmail(email){
    setEmail(email);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,

    username:username,
    email:email,
    password:password,
    phone:phone,
    adresse:adresse,
    role:role,
    date:date,
    updateUserInfo:updateUserInfo,
    updateUserEmail:updateUserEmail



  };

  const isLoggedIn = async () => {
    try {
      setIsLoadingAuth(true);

      let userToken = await AsyncStorage.getItem("token");
      setAuthToken(userToken);

      setTimeout(() => {
        setIsLoadingApp(false);
      }, 5000); // Simule un délai de chargement
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if(isLoadingApp){
    return <SplashScreen/>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
