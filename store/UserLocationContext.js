import { createContext, useEffect, useState } from "react";  
import * as Location from 'expo-location'; 

export const UserLocationContext = createContext(null);


function UserLocationProvider({children}){

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
         
        })();
    
        
      }, []);


    return <UserLocationContext.Provider value={{location , setLocation}}>{children}</UserLocationContext.Provider>

}

export default UserLocationProvider;