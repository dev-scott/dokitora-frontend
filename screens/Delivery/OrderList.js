import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import {  getOrderByUser } from "../../utils/api";
import OrderCard from "../../components/DeliveryFlow/OrderCard";
// impimport { Ionicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import { selectmyOrder, setMyOrder } from "../../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../store/AuthContext";
import { useFocusEffect } from '@react-navigation/native';


const OrderList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const [ordersFilter , setOrdersFilter] = useState([]);

  const [search , setSearch]= useState('');

  const authCtx = useContext(AuthContext)

  console.log(authCtx.orderId)

  const dispatch = useDispatch()

  // useEffect(() => {

      
  //     return () => {
  //       console.log('cleaned up');
    
  //     }
  //   }, []);


    useFocusEffect(
      React.useCallback(() => {
        
        getOrders();

    
        return () => {
          
          // Code de nettoyage si nécessaire
          // Ce code sera appelé lorsqu'on quitte cet écran ou qu'il perd le focus
        };
      }, [])
    );
    
    
    const getOrders = async () => {
    //   const token = getToken()
    const result = await getOrderByUser();

    const resp = result.data;

    // console.log(resp);
    setOrders(resp);
    setOrdersFilter(resp)

    dispatch(setMyOrder(resp));


  };
  console.log(orders)
//   // console.log(pharmacyData.attributes)


  const searchFilter = (value)=>{

    if(value){
      const newData = orders.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData)>-1
      });
      setOrdersFilter(newData);
      setSearch(value);
    }else {
      setOrdersFilter(orders);
      setSearch(value)
    }

  }

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView
      className="bg-primary flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <Header openDrawer={openDrawer}  />

      <View className="mt-5" >
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
            value={search}

            onChangeText={(value) => searchFilter(value)}
            // onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
      </View>






      <View className="mt-[25px] pr-2 flex justify-between items-center flex-row ">
        <Text className="text-white text-[18px] font-semibold leading-[37.80px] mt-[4px] ">
          Vos commandes {authCtx.orderId}
        </Text>
        <Entypo name="dots-three-horizontal" size={24} color="white" />
        </View>


        <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        className="overflow-hidden py-5"
      >
        {ordersFilter.map((order , index)=>(
            <OrderCard key={index} name={order.name} phone={order.phone} date={order.date} email={order.email} pharmacy_name={order.pharmacy_name} order_price={order.order_price} onder_confirm={order.confirmed} id={order.id} order_pharmacy_number={order.order_pharmacy_number} />
            ))}
            {/* <Text className="text-white">ddd</Text> */}

        </ScrollView>




    </SafeAreaView>
  );
};

export default OrderList;
