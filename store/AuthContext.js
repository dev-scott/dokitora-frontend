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
  id:"",
  updateUserInfo:(username)={},
  updateUserEmail:(email)={},
  updateUserId:(id)={},


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
  const [id , setId]= useState("")

  function authenticate(token) {
    setIsLoadingAuth(true);
    setAuthToken(token);
    AsyncStorage.setItem("token", token );
    AsyncStorage.setItem("username",username); 
    AsyncStorage.setItem("email",email);  

    setIsLoadingAuth(false);
  }

  function updateUserInfo(username){
    setUsername(username);
  }
  function updateUserId(id){
    setId(id);
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
    id:id,
    updateUserInfo:updateUserInfo,
    updateUserEmail:updateUserEmail,
    updateUserId:updateUserId



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
