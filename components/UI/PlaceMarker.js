import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

export default function PlaceMarker({item}) {
  return (
    <Marker 
    coordinate={
        {
            latitude: item.attributes.latitude,
            longitude: item.attributes.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
        }
    }
    title={item.attributes.name} 
    description={item.attributes.description}

     >
    
        </Marker>
  )
}