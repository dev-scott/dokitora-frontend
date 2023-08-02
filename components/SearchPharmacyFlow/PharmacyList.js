import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import PharmacyItem from './PharmacyItem'



const PharmacyList = ({placeList}) => {

  const navigation = useNavigation();



  return (
    <View >
    <LinearGradient
      // Background Linear Gradient
      colors={["transparent", "white"]}
      style={{ padding: 20,  width: Dimensions.get("screen").width }}
    >
      <FlatList
      data={placeList}
      horizontal={true}
      renderItem={({item,index})=>index<=6&&(
      <TouchableOpacity >
          <PharmacyItem place={item} />
      </TouchableOpacity>
      )}
      />
    </LinearGradient>
  </View>
  )
}

export default PharmacyList