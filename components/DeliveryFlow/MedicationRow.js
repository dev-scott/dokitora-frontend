import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../../slices/cartSlice';

const MedicationRow = ({name, description, id, price, image}) => {

    const  dispatch = useDispatch();

    const totalItems = useSelector(state=> selectCartItemsById(state, id));


    const handleIncrease = ()=>{
        dispatch(addToCart({id, name, price, image, description}));
    }
    const handleDecrease = ()=>{
        dispatch(removeFromCart({id}))
    }


  return (
    <>
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image className="rounded-3xl" style={{height: 100, width: 100}} source={{uri:image}}/>
        <View className="flex flex-1 space-y-3">
            <View className="pl-3">
                <Text className="text-xl">{name}</Text>
                <Text className="text-gray-700">{description}</Text>
            </View>
            <View className="flex-row pl-3 justify-between items-center">
                <Text className="text-gray-700 text-lg font-bold">
                    ${price}
                </Text>
                <View className="flex-row items-center">
                    <TouchableOpacity 
                        onPress={handleDecrease} 
                        disabled={!totalItems.length} 
                        className="p-1 rounded-full bg-zin500" 
                        >
                        <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                    </TouchableOpacity>
                    <Text className="px-3">
                    {totalItems.length}
                    </Text>
                    
                    <TouchableOpacity 
                        onPress={handleIncrease} 
                        className="p-1 rounded-full bg-zin500" 
                        >
                        <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </View>
</>

  )
}

export default MedicationRow