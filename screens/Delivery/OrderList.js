import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import {  getOrderByUser } from "../../utils/api";
import OrderCard from "../../components/DeliveryFlow/OrderCard";
// import { getToken } from "../../utils/helpers";

const OrderList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      getOrders();
    }, []);
    
    const getOrders = async () => {
    //   const token = getToken()
    const result = await getOrderByUser();

    const resp = result.data;

    // console.log(resp);
    setOrders(resp);
  };
  console.log(orders)
//   // console.log(pharmacyData.attributes)


// const [orders, setOrders] = useState([]);

// useEffect(() => {
//     getOrders();
// }, []);

// const getOrders = async () => {
//   const result = (await getOrderByUser()).data;

//   const resp = result.data;

//   console.log(resp);
//   setOrders(resp);
// };
// console.log(blogs);
// console.log(pharmacyData.attributes)

// const navigation = useNavigation()


  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView
      className="bg-slate950 flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <Header openDrawer={openDrawer}  />

      <View className="mt-[25px]">
        <Text className="text-white text-[28px] font-semibold leading-[37.80px] mt-[4px] ">
          Historique de vos commandes
        </Text>
        <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-visible py-5"
      >
        {orders.map((order , index)=>(
            <OrderCard key={index} name={order.name} phone={order.phone} date={order.date} email={order.email} pharmacy_name={order.pharmacy_name} order_price={order.order_price} onder_confirm={order.confirmed} id={order.id} />
            ))}
            {/* <Text className="text-white">ddd</Text> */}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderList;
