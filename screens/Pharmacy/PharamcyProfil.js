import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

import { AntDesign } from "@expo/vector-icons";
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
// import GoogleMapView from '../Home/GoogleMapView';
import { TouchableOpacity } from 'react-native';
import GoogleMapView from '../../components/UI/GoogleMapView';
import Share from '../../Services/Share';
import { Platform } from 'react-native';
import { Linking } from 'react-native';

const PharamcyProfil = () => {



    const { params:place} = useRoute()
    console.log(place)


    const onDirectionClick=()=>{
        const url=Platform.select({
          ios:"maps:"+place.attributes.latitude + "," + place.attributes.longitude + "?q=" ,
          android:"geo:"+place.attributes.latitude + "," + place.attributes.longitude + "?q=",
        });
    
        Linking.openURL(url)
      }



  return (
    <SafeAreaView
    className="bg-white flex-1 relative px-[16px]   "
    pointerEvents="box-none"
  >

<View>
       <Text style={{ fontSize: 26, fontFamily: "raleway-bold" }}>
        {place.attributes.name}
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
        }}
      >
        <AntDesign name="star" size={20} color={"red"} />
        <Text>{place.rating}</Text>
      </View>
        <Image
          source={{
            uri:place.attributes.image.data.attributes.url
          }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 15,
            marginTop: 10,
          }}
        />

      
        <Text
        style={{ fontSize: 16, marginTop: 10 }  } className="text-gray-dark"
        numberOfLines={2}
        >
        {place.attributes.adresse}
      </Text>
      {/* {place?.opening_hours ? (
        <Text style={{ fontFamily: "raleway" }}>
          {place?.opening_hours?.open_now == true ? 
          "(Open)" : 
          "(Closed)"}
        </Text>
      ) : null} */}

        <View   style={{marginTop:10,flexDirection:'row', 
    display:'flex', gap:10}}>
        <TouchableOpacity onPress={onDirectionClick}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            // backgroundColor:Colors.GRAY,
            width:110,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
          className="bg-indigo600"
        >
          <Ionicons name="navigate-circle-outline" size={24} color="white" />
          <Text style={{ fontFamily: "raleway", fontSize: 16 }} className="text-white" >Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Share.SharePlace(place)}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            width:90,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
          className="bg-indigo600 "
        >
         <Ionicons name="md-share-outline" size={24} color="white" />
          <Text style={{ fontSize: 16 }} className="text-white" >Share</Text>
        </TouchableOpacity>
        </View>

     
    </View>

    <GoogleMapView place={place} />

    </SafeAreaView>
  )
}

export default PharamcyProfil