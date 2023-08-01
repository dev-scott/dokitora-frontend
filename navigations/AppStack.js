import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import PharmacyDetail from '../screens/Delivery/PharmacyDetail';
import HomeDelivery from '../screens/Delivery/HomeDelivery';
import HomePharmacy from '../screens/Pharmacy/HomePharmacy';
import HomeScreen from '../screens/Root/HomeScreen';
import CartScreen from '../screens/Delivery/CartScreen';
import PreparingOrder from '../screens/Delivery/PreparingOrder';
import DeliveryScreen from '../screens/Delivery/DeliveryScreen';


const Stack = createNativeStackNavigator();


const AppStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="PharmacyDetail" component={PharmacyDetail} />
        <Stack.Screen name="CartScreen" options={{presentation:'modal'}} component={CartScreen} />
        <Stack.Screen name="HomeDelivery" component={HomeDelivery} />
        <Stack.Screen name="HomePharmacy" component={HomePharmacy} />
        <Stack.Screen name="PreparingOrder" options={{presentation:'fullScreenModal'}} component={PreparingOrder} />
        <Stack.Screen name="Delivery" options={{presentation:'fullScreenModal'}} component={DeliveryScreen} />
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default AppStack