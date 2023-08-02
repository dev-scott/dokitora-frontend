import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PharmacyItem = ({ place }) => {
  return (
    <View
      className="bg-white"
      style={{
        width: 140,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 0.4,
      }}
    >
      {place?.attributes.image.data.attributes.url ? (
        <Image
          source={{
            uri:place.attributes.image.data.attributes.url
          }}
          style={{ width: 120, height: 80, borderRadius: 10 }}
        />
      ) : (
        <Image
          source={require("../../assets/placeholder.jpg")}
          style={{ width: 130, height: 100, borderRadius: 9 }}
        />
      )}
      <Text
        numberOfLines={2}
    
        style={{
            fontFamily: "sharp-sans",
            fontSize: 16, marginTop: 5
          }}

      >
        {place.attributes.name}
      </Text>
      <Text className="text-gray-dark"
        numberOfLines={2}
        style={{
          fontFamily: "raleway",
          fontSize: 13,
          marginTop: 5,
         
        }}
      >
        {place.attributes.adresse}
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
          marginBottom: -5,
        }}
      >
        <AntDesign name="star" size={20} color="orange" />
        <Text>{place.rating}</Text>
      </View>
    </View>
  );
};

export default PharmacyItem;
