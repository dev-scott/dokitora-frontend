import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { assets } from "../../constants";
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState();

  const Logo =assets.LogoIcon

  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["#F0EEFD", "transparent"]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >

        <View
          className="bg-white"
          style={{
            display: "flex",
            marginTop: 5,
            flexDirection: "row",
            padding: 10,
            gap: 5,
            elevation: 0.7,
            alignItems: "center",

            borderRadius: 5,
          }}
        >
          <Ionicons className="bg-white" name="search" size={24} />
          <TextInput
            className="bg-white"
            placeholder="Search"
            style={{ width: "80%" }}
            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
