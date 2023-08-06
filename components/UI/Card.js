import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import assets from "../../constants/assets";
import { useNavigation } from "@react-navigation/native";
import { getBlogs } from "../../utils/api";
import BlogCard from "../Blog/BlogCard";

const Buy = assets.Buy;
const HeadPhone = assets.HeadPhone;
const Message = assets.Message;
const Search = assets.Search;

const maxVisibleItems = 6;

const Card = ({ info, index, activeIndex, totalLength, navigation }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    const result = (await getBlogs()).data;

    const resp = result.data;

    // console.log(resp);
    setBlogs(resp);
  };
  // console.log(blogs);
  // console.log(pharmacyData.attributes)

  // const navigation = useNavigation()

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

  // function ToNavigate(){
  //   navigation.navigate("HomeDelivery")
  // }

  if (index == 0) {
    return (
      <Animated.View
        style={stylez}
        className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow  `}
      >
        <Text className="text-base font-bold text-slate950  ">
          {" "}
          Que désirez-vous effectuer ?{index}
        </Text>

        {/* <Text>{info.type}</Text> */}

        <View className="flex flex-row flex-wrap flex-1 w-full gap-1  mt-3 ">
          <Pressable
            onPress={() => {
              navigation.navigate("HomeDelivery");
            }}
            className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    "
          >
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
          <Pressable
            onPress={() => {
              navigation.navigate("NewChat");
            }}
            className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    "
          >
            <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
              <Buy />
            </View>

            <View className="mt-6">
              <Text className="text-indigo950 text-sm font-bold   ">
                Consulter
              </Text>
              <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
                {" "}
                Entretenez-vous avec un specialiste
              </Text>
            </View>
          </Pressable>
          <Pressable className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
            <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
              <Buy />
            </View>

            <View className="mt-6">
              <Text className="text-indigo950 text-sm font-bold   ">Optenier de l'aide</Text>
              <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
                {" "}
                Rencontrez vous un probleme
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("SearchPharmacy");
            }}
            className=" w-[130px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    "
          >
            <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
              <Buy />
            </View>

            <View className="mt-6">
              <Text className="text-indigo950 text-sm font-bold">Trouvez</Text>
              <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
                {" "}
                Une pharmacie de garde proche de vous
              </Text>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    );
  } else if (index == 1) {
    return (
      <Animated.View
        style={stylez}
        className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow overflow-hidden  `}
      >
        <Text className="text-base font-bold text-slate950  ">
          Nos dernier Blogs

        </Text>

        {/* <Text>{info.type}</Text> */}

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-visible py-5 "
      >
  
  

          {blogs.map((blog, index) => (
            <BlogCard title={blog.attributes.title} id={blog.id} key={blog.id} description={blog.attributes.description} cover={blog.attributes.cover.data.attributes.url} />
          ))}
          
       </ScrollView>
      </Animated.View>
    );
  }

  else if (index == 2) {
    return (
      <Animated.View
        style={stylez}
        className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow overflow-hidden  `}
      >
        <Text className="text-base font-bold text-slate950  ">
          Nos dernier Blogs

        </Text>

        {/* <Text>{info.type}</Text> */}

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-visible py-5 "
      >
  
  

          {blogs.map((blog, index) => (
            <BlogCard title={blog.attributes.title} id={blog.id} key={blog.id} description={blog.attributes.description} cover={blog.attributes.cover.data.attributes.url} />
          ))}
          
       </ScrollView>
      </Animated.View>
    );
  }

  else if (index == 3) {
    return (
      <Animated.View
        style={stylez}
        className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow overflow-hidden  `}
      >
        <Text className="text-base font-bold text-slate950  ">
          Nos dernier Blogs

        </Text>

        {/* <Text>{info.type}</Text> */}

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-visible py-5 "
      >
  
  

          {blogs.map((blog, index) => (
            <BlogCard title={blog.attributes.title} id={blog.id} key={blog.id} description={blog.attributes.description} cover={blog.attributes.cover.data.attributes.url} />
          ))}
          
       </ScrollView>
      </Animated.View>
    );
  }


  
  // return (
  //   <Animated.View
  //     style={stylez}
  //     className={` w-full h-[455px] p-6  bg-indigo50 bg-opacity-95 rounded-[32px] shadow  `}
  //   >
  //     <Text className="text-base font-bold text-slate950  ">
  //       {" "}
  //       Que désirez-vous effectuer ?{" "}
  //     </Text>

  //     {/* <Text>{info.type}</Text> */}

  //     <View className="flex flex-row flex-wrap flex-1 w-full  gap-[10px] mt-6 ">
  //       <Pressable className=" w-[150px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
  //         <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
  //           <Buy />
  //         </View>

  //         <View className="mt-6">
  //           <Text className="text-indigo950 text-sm font-bold   ">
  //             Commander
  //           </Text>
  //           <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
  //             {" "}
  //             Faites-vous livrer vos médicaments chez vous{" "}
  //           </Text>
  //         </View>
  //       </Pressable>
  //       <Pressable className=" w-[150px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
  //         <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
  //           <Buy />
  //         </View>

  //         <View className="mt-6">
  //           <Text className="text-indigo950 text-sm font-bold   ">
  //             Commander
  //           </Text>
  //           <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
  //             {" "}
  //             Faites-vous livrer vos médicaments chez vous{" "}
  //           </Text>
  //         </View>
  //       </Pressable>
  //       <Pressable className=" w-[150px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
  //         <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
  //           <Buy />
  //         </View>

  //         <View className="mt-6">
  //           <Text className="text-indigo950 text-sm font-bold   ">
  //             Commander
  //           </Text>
  //           <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
  //             {" "}
  //             Faites-vous livrer vos médicaments chez vous{" "}
  //           </Text>
  //         </View>
  //       </Pressable>
  //       <Pressable className=" w-[150px] h-[166px] bg-white600 p-4 rounded-3xl border  border-white backdrop-blur-xl flex justify-center items-start    ">
  //         <View className=" flex justify-center items-center bg-green600 p-3 rounded-full ">
  //           <Buy />
  //         </View>

  //         <View className="mt-6">
  //           <Text className="text-indigo950 text-sm font-bold   ">
  //             Commander
  //           </Text>
  //           <Text className="text-indigo950 text-opacity-70 mt-3 text-xs font-normal leading-tight">
  //             {" "}
  //             Faites-vous livrer vos médicaments chez vous{" "}
  //           </Text>
  //         </View>
  //       </Pressable>
  //     </View>
  //   </Animated.View>
  // );
};

export default Card;
