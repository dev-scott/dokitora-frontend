import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({id , title , description , cover}) => {

    const navigation = useNavigation();



    return (
        <TouchableOpacity className="  mr-5 w-72 h-5/6 mt-1  bg-white rounded-3xl shadow-lg   "
          onPress={() => {
            navigation.navigate("BlogDetail", {
        id,
        title,
        description,
        cover
            });
          }}
        >
          <View  className="    ">
            <Image className="h-1/2 w-full rounded-t-3xl" source={{ uri: cover }} />
    
            <View className="px-3 pb-4 space-y-2">
              <Text
                style={{
                  fontFamily: "sharp-sans",
                }}
                className="text-lg font-bold pt-2"
              >
                {title}
              </Text>
              <View className="flex-row items-center space-x-1">
           
                <Text className="text-xs">
                  <Text
                    style={{
                      fontFamily: "sharp-sans",
                    }}
                    className="text-green-700"
                  >
                    {/* {rating} */}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "sharp-sans",
                    }}
                    className="text-gray-700"
                  >
                    {" "}
                    {/* ({reviews} review) */}
                  </Text>{" "}
                  ·{" "}
                  <Text
                    style={{
                      fontFamily: "sharp-sans",
                    }}
                    className="font-semibold text-gray-700"
                  >
                    {/* {type} */}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                {/* <Icon.MapPin color="gray" width={15} height={15} /> */}
                <Text
                  style={{
                    fontFamily: "sharp-sans",
                  }}
                  className="text-gray-700 text-xs"
                >
                  {" "}
                  {/* Nearby · {address} */}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );


}

export default BlogCard