import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import assets from "../../constants/assets";

const Buy = assets.Buy;
const HeadPhone = assets.HeadPhone;
const Message = assets.Message;
const Search = assets.Search;

const maxVisibleItems = 6;

const Card = ({ info, index, activeIndex, totalLength }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: totalLength - index,
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / maxVisibleItems, 1, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-22, 0, 425 - 22]
          ),
        },

        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.96, 1, 1]
          ),
        },
      ],
    };
  });

  // console.log(activeIndex.value);
  const myIndex = activeIndex.value;
  console.log(myIndex);

  return (
    <Animated.View
      style={stylez}
      className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow  `}
    >
      <Text className="text-base font-bold text-slate950  " > Que désirez-vous effectuer ? </Text>

      {/* <Text>{info.type}</Text> */}

      <View className="flex flex-row flex-wrap flex-1 w-full  gap-[10px] mt-6 ">
        <Pressable className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
          <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">

          <Buy />
          </View>

          <View className="mt-6">
            <Text className="text-indigo950 text-sm font-bold   ">
              Commander
            </Text>
            <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
              {" "}
              Faites-vous livrer vos médicaments chez vous{" "}
            </Text>
          </View>
        </Pressable>
        <Pressable className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
          <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">

          <Buy />
          </View>

          <View className="mt-6">
            <Text className="text-indigo950 text-sm font-bold   ">
              Commander
            </Text>
            <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
              {" "}
              Faites-vous livrer vos médicaments chez vous{" "}
            </Text>
          </View>
        </Pressable>
        <Pressable className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
          <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">

          <Buy />
          </View>

          <View className="mt-6">
            <Text className="text-indigo950 text-sm font-bold   ">
              Commander
            </Text>
            <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
              {" "}
              Faites-vous livrer vos médicaments chez vous{" "}
            </Text>
          </View>
        </Pressable>
        <Pressable className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
          <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">

          <Buy />
          </View>

          <View className="mt-6">
            <Text className="text-indigo950 text-sm font-bold   ">
              Commander
            </Text>
            <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
              {" "}
              Faites-vous livrer vos médicaments chez vous{" "}
            </Text>
          </View>
        </Pressable>

      </View>
    </Animated.View>
  );
};

export default Card;
