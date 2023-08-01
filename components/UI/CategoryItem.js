import { View, Text, Image } from 'react-native'
import React from 'react'

export default function CategoryItem({category}) {


  return (
    <View className="p-1 flex items-center justify-center m-1 w-full h-24 rounded-xl bg-gray-dark"
    >
        <Image source={category.icon}
            style={{width:40,height:30}}
        />
      <Text style={{fontSize:13}}>
        {category.name}</Text>
    </View>
  )
}