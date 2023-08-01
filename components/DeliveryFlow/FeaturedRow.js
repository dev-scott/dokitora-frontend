import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import PharmacyCard from "./PharmacyCard";
import { getPharmacy } from "../../utils/api";

const FeaturedRow = ({ title, description, restaurants }) => {


  const [pharmacyData , setPharmacyData] = useState([])

  // useEffect(()=>{

  //   getPharmacy().then((data)=>{
  //     // setPharmacyData(data.data)
  //     // console.log(data.data)
  //   })

  // },[])
  
  // console.log(pharmacyData)

  useEffect(()=>{
    getPharmacyData();
  },[])


  const getPharmacyData=async()=>{
    const result=(await getPharmacy()).data;
   
    const resp=result.data
   
    console.log(resp)
    setPharmacyData(resp)
  }
  // console.log(pharmacyData)
  // console.log(pharmacyData.attributes)
  
  return (
    <View>
      <View className="flex-row justify-between items-center ">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
          
        </View>

        <TouchableOpacity>
          <Text className="font-semibold bg-gray-dark ">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:0,
        }}
        className="overflow-visible py-5"
       >
        {
          pharmacyData.map(pharmacy=>{
            return (
                <PharmacyCard
                  key={pharmacy.id}
                  id={pharmacy.id}
                  imgUrl={pharmacy.attributes.image.data.attributes.url}
                  title={pharmacy.attributes.name}
                  // rating={resturant.rating}
                  // type={resturant.type?.name}
                  address={pharmacy.attributes.adresse}
                  description={pharmacy.attributes.description}
                  medications={pharmacy.attributes.medication.data}
                  lng={pharmacy.attributes.longitude}
                  lat={pharmacy.attributes.latitude}

              />    
            )
          })
        }           
       </ScrollView>

    </View>
  );
};

export default FeaturedRow;
