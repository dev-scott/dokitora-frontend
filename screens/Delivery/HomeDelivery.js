import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { assets } from "../../constants";
import MCategories from "../../components/DeliveryFlow/MCategories";
import FeaturedRow from "../../components/DeliveryFlow/FeaturedRow";
import { featured } from "../../constants/dummyData";
import { getPharmacy } from "../../utils/api";
import PharmacyCard from "../../components/DeliveryFlow/PharmacyCard";

const HomeDelivery = () => {
  // const [pharmacyData , setPharmacyData] = useState([])

  const [pharmacyData, setPharmacyData] = useState([]);

  const [pharmacyFilter, setPharmacyFilter] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getPharmacyData();
  }, []);

  const getPharmacyData = async () => {
    const result = (await getPharmacy()).data;

    const resp = result.data;

    console.log(resp);
    setPharmacyData(resp);
    setPharmacyFilter(resp);
  };
  // console.log(pharmacyData)
  // console.log(pharmacyData.attributes)

  const searchFilter = (value) => {
    if (value) {
      const newData = pharmacyData.filter((item) => {
        const itemData = item.attributes.name
          ? item.attributes.name.toUpperCase()
          : "".toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData) > -1;
      });
      setPharmacyFilter(newData);
      setSearch(value);
    } else {
      setPharmacyFilter(pharmacyData);
      setSearch(value);
    }
  };

  const navigation = useNavigation();

  const Search = assets.Search;
  const Cart = assets.Cart;

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView
      style={{
        fontFamily: "sharp-sans",
      }}
      className="  flex-1  relative px-[16px] pt-[44px] pb-8 "
    >
      <StatusBar barStyle="dark-content" />

      <View className="mt-3 flex items-end ">
        <View className="flex items-center justify-center relative  rounded-full h-7 w-7 ">
          <View className="absolute z-10 bg-pink w-2 h-2 rounded-full -right-1 -top-1"></View>
          <Cart className="text-white" />
        </View>
      </View>

      <View className="flex-row items-center mt-5  pb-2 ">
        <View className="flex-row flex-1 items-center p-1 rounded-xl border bg-white border-gray-300">
          <Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Resturants"
            className="ml-2 flex-1"
            keyboardType="default"
            value={search}
            onChangeText={(value) => searchFilter(value)}
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            {/* <Icon.MapPin height="20" width="20" stroke="gray" /> */}
            <Text
              style={{
                fontFamily: "sharp-sans",
              }}
              className="text-gray-600"
            >
              New York, NYC
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* <MCategories /> */}

        {/* Featured */}

        <View className="mt-5">
          {/* {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })} */}

          <View>
            <View className="flex-row justify-between items-center ">
              <View>
                <Text
                  style={{
                    fontFamily: "sharp-sans",
                  }}
                  className="text-lg"
                >
                  En tendance
                </Text>
                <Text
                  style={{
                    fontFamily: "sharp-sans",
                  }}
                  className="text-gray-500 text-xs"
                >
                  gg
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
            </View>

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

          <View>
            <View className="flex-row justify-between items-center ">
              <View>
                <Text
                  style={{
                    fontFamily: "sharp-sans",
                  }}
                  className="text-lg"
                >
                  Pour vous
                </Text>
                <Text
                  style={{
                    fontFamily: "sharp-sans",
                  }}
                  className="text-gray-500 text-xs"
                >
                  pharmacies qui vous  conviens
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
            </View>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDelivery;
