import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { featured } from "../../constants/dummyData";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectpharmacy } from "../../slices/pharmacySlice";
import { removeFromCart, selectCartItems, selectCartTotal } from "../../slices/cartSlice";
import * as Notifications from "expo-notifications";

const CartScreen = () => {
    const [groupedItems, setGroupedItems] = useState([]);

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    const dispatch = useDispatch();
    const deliveryFee = 2;

  
    const pharmacy = useSelector(selectpharmacy)

  const navigation = useNavigation();

  useMemo(() => {
    const gItems = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(gItems);
    // console.log('items: ',gItems);
  }, [cartItems]);





  // send notification

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permissions required",
          "Push notifications nedd the appropriate permissions"
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "ba564e9b-fe1e-4b24-9fac-13eb619fb567",
      });
      console.log(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("Notification received")
        // console.log(notification)
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received");
        console.log(response);
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);


  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: " Merci d'avoir fait confiance a Dokitora , Votre commande a bien ete pris en charge ",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: {
        seconds: 1,
      },
    });

    navigation.navigate("PreparingOrder")

  }



  return (
    <SafeAreaView
      className="bg-white flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <View className="bg-white flex-1">
        <View className="relative py-4 shadow-sm">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute z-10 bg-primary rounded-full p-1 shadow top-5 left-2"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-center font-bold text-xl">Your cart</Text>
            <Text className="text-center text-gray-500">
              {pharmacy.title}
            </Text>
          </View>
        </View>

        <View className="flex-row bg-indigo50 px-4 items-center">
          <Image
            source={require("../../assets/images/bikeGuy.png")}
            className="w-20 h-20 rounded-full"
          />
          <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
          <TouchableOpacity>
            <Text className="font-bold">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-white pt-5"
          contentContainerStyle={{ paddingBottom:50 }}
        >
        {Object.entries(groupedItems).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
              >
                <Text  className="font-bold">
                  {items.length} x
                </Text>
                <Image
                  className="h-14 w-14 rounded-full"
                  source={items[0].image}
                />
                <Text className="flex-1 font-bold text-gray-700">
                  {items[0].name}
                </Text>
                <Text className="font-semibold text-base">${items[0].price}</Text>
                <TouchableOpacity
                  className="p-1 rounded-full bg-indigo50"

                  onPress={() => dispatch(removeFromCart({ id: items[0]?.id }))}
                >
                  <Icon.Minus
                    strokeWidth={2}
                    height={20}
                    width={20}
                    stroke="white"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View
        
        className=" bg-indigo600 text-white p-6 px-8 rounded-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text  className="text-white">Subtotal</Text>
          <Text className="text-white">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-white">Delivery Fee</Text>
          <Text className="text-white">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold text-white">Order Total</Text>
          <Text className="font-extrabold text-white ">${deliveryFee + cartTotal}</Text>
        </View>
        <View>
          <TouchableOpacity
           
            onPress={scheduleNotificationHandler}
            className="p-3 rounded-[4px] bg-indigo500 "
          >
            <Text className="text-white text-center font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
