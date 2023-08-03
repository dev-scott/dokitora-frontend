import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { assets } from "../../constants";
import MedicationRow from "../../components/DeliveryFlow/MedicationRow";
import CartIcon from "../../components/DeliveryFlow/CartIcon";
import { useDispatch } from "react-redux";
import { setPharmacy } from "../../slices/pharmacySlice";

const BlogDetail = () => {
  const navigation = useNavigation();

  const ArrowLeft = assets.ArrowLeft;

//   const dispatch = useDispatch();

// id,
// title,
// description,
// cover

  const {
    params: {
  id,
  title,
  description,
  cover
    },
  } = useRoute();

  const item = {
    id,
    title,
    description,
    cover
  };

//   console.log("Pharmacy", item.lng, item.lat);


  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: cover }} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-white p-2 rounded-full shadow"
          >
            <ArrowLeft />
          </TouchableOpacity>
        </View>

        <View
        //   style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text
              style={{
                fontFamily: "sharp-sans",
              }}
              className="text-3xl font-bold"
            >
              {title}
            </Text>
            {/* copy this code from restaurant card */}
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">rating</Text>
                  <Text
                    style={{
                      fontFamily: "sharp-sans",
                    }}
                    className="text-gray-700"
                  >
                    {" "}
                    (4.6k review)
                  </Text>{" "}
                  ·{" "}
                  <Text
                    style={{
                      fontFamily: "sharp-sans",
                    }}
                    className="font-semibold text-gray-700"
                  >
                    #safe
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                {/* <Icon.MapPin color="gray" width={15} height={15} /> */}
                <Text className="text-gray-800 text-xs">
                  {" "}
                  Make by @Jamo
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{description}</Text>
          </View>
        </View>

        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-semibold">Medicament</Text>
   
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogDetail;
