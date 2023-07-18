import { View, Text } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const maxVisibleItems = 6;

const Card = ({ info, index, activeIndex, totalLength  }) => {
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
  const myIndex = activeIndex.value
  console.log(myIndex);

  return (
    <Animated.View
      style={stylez}
      className={ ` w-full h-[325px] p-6  bg-white bg-opacity-95 rounded-[32px] shadow  ` }
    >
      <Text>{info.type}</Text>
    </Animated.View>
  );
};

export default Card;
