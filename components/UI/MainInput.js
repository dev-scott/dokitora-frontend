import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 

const MainInput = ({textInputConfig ,style, onUpdateValue , children }) => {
  return (
    <View className={` ${style} w-full h-[48px] pl-4 rounded-2xl border border-neutral600   flex items-center flex-row justify-around  `}>
        
        {/* <Ionicons name="person" size={18} color="black"/> */}
        {children}

        <TextInput onChangeText={onUpdateValue} {...textInputConfig} className=" ml-[10px] text-[12px] font-normal text-zin800  h-full grow shrink basis-0 " />
    </View>
  )
}

export default MainInput