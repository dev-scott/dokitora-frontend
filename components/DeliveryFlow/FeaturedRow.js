import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import PharmacyCard from "./PharmacyCard";
import { getPharmacy } from "../../utils/api";

const FeaturedRow = ({ title, description, restaurants }) => {
  const [pharmacyData, setPharmacyData] = useState([]);

  
  const [pharmacyFilter , setPharmacyFilter] = useState([]);

  const [search , setSearch]= useState('');


  useEffect(() => {
    getPharmacyData();
  }, []);

  const getPharmacyData = async () => {
    const result = (await getPharmacy()).data;

    const resp = result.data;

    console.log(resp);
    setPharmacyData(resp);
    setPharmacyFilter(resp)
  };
  // console.log(pharmacyData)
  // console.log(pharmacyData.attributes)


  const searchFilter = (value)=>{

    if(value){
      const newData = orders.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData)>-1
      });
      setOrdersFilter(newData);
      setSearch(value);
    }else {
      setOrdersFilter(orders);
      setSearch(value)
    }

  }



  return (
    <View>
      {/* <View className="flex-row justify-between items-center ">
        <View>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-lg"
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="text-gray-500 text-xs"
          >
            {description}
          </Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "sharp-sans",
            }}
            className="font-semibold  "
          >
            See All
          </Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-visible py-5"
      >
        {pharmacyFilter.map((pharmacy) => {
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
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
