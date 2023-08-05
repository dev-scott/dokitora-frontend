import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../store/UserLocationContext";

const GoogleMapView = ({place}) => {
  const [mapRegion, setmapRegion] = useState([]);

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    console.log(location);
    if (location) {
      setmapRegion({
        latitude: place.attributes.latitude,
        longitude: place.attributes.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <View className="mt-4 rounded-2xl">
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "600",
          // fontFamily: "sharp-sans",
        }}
      >
        Top Near By Places
      </Text>
      <MapView
        style={{
          width: Dimensions.get("screen").width * 0.89,
          height: Dimensions.get("screen").height * 0.23,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker title={place.attributes.name} coordinate={mapRegion} />
      </MapView>
    </View>
  );
};

export default GoogleMapView;
