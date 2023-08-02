import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../store/UserLocationContext";

const GoogleMapView = () => {

    const [mapRegion, setmapRegion] = useState([]);

    const {location , setLocation } = useContext(UserLocationContext)

    useEffect(()=>{
        console.log(location)
        if(location)
        {
            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
            })
        }
      },[location])
     
    

  return (
    <View className="mt-4 rounded-2xl" >
      <MapView
        style={{
          width: Dimensions.get("screen").width * 0.89,
          height: Dimensions.get("screen").height * 0.23,
        }}

        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}

      >

<Marker title="You" coordinate={mapRegion}/>

      </MapView>
    </View>
  );
};

export default GoogleMapView;
