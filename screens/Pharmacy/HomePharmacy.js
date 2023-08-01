import { View, Text ,SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GoogleMapView from "../../components/UI/GoogleMapView";
import Header from "../../components/UI/Header";
import { useNavigation } from "@react-navigation/native";
import { UserLocationContext } from "../../store/UserLocationContext";
import GlobalApi from "../../Services/GlobalApi";

const HomePharmacy = ({navigation}) => {
  // const navigation = useNavigation();

  const [placeList , setPlaceList] = useState([]);
  const {location , setLocation} = useContext(UserLocationContext)

  useEffect(()=>{
    if(location){
        GetNearBySearchPlace('pharmacy'); 

    }
  },[location])

  // const openDrawer = () => {
  //   navigation.openDrawer();
  // };


  const GetNearBySearchPlace=(value)=>{
   
    GlobalApi.nearByPlace(location.coords.latitude,
      location.coords.longitude,value).then(resp=>{

          setPlaceList(resp.data.results);
          console.log(placeList)

    })
  } 


  return (
    <SafeAreaView  className="bg-slate950 flex-1 relative px-[16px] pt-[44px] pb-8 ">
      <Header openDrawer={openDrawer} />
      <GoogleMapView />

    </SafeAreaView>
  );
};

export default HomePharmacy;
