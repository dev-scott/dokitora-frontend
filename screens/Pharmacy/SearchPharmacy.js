import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "../../components/UI/Header";
import PlaceMarker from "../../components/UI/PlaceMarker";
import { getPharmacy } from "../../utils/api";
import SearchBar from "../../components/UI/SearchBar";
import PharmacyList from "../../components/SearchPharmacyFlow/PharmacyList";

const SearchPharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState([]);

  useEffect(() => {
    getPharmacyData();
  }, []);

  const getPharmacyData = async () => {
    const result = (await getPharmacy()).data;

    const resp = result.data;

    // console.log(resp);
    setPharmacyData(resp);
  };
  // console.log(pharmacyData);
  // console.log(pharmacyData.attributes)

  return (
    <SafeAreaView
      className="bg-white flex-1 relative "
      pointerEvents="box-none"
    >
      <View style={{ position: "absolute", zIndex: 20 }}>
        <SearchBar />
      </View>

      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="bonne"
          description="bonne"
          pinColor={"blue"}
        />

        {/* {pharmacyData.map((item, index) => {
          <PlaceMarker item={item} key={index} />;
        })} */}

        {pharmacyData.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.attributes.latitude,
                longitude: item.attributes.longitude,
              }}
              title={item.attributes.name}
              description={item.attributes.description}
              // pinColor={themeColors.bgColor(1)}
            />
          );
        })}
      </MapView>

        <View className=" absolute z-20 bottom-0 " >
          
          <PharmacyList placeList = {pharmacyData} />

        </View>

    </SafeAreaView>
  );
};

export default SearchPharmacy;
