import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../../constants/dummyData'

const MCategories = () => {

  const [activeCategory , setActiveCategory] = useState(null)
  return (
    <View  className=" w-full h-10  mt-4" >

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
            paddingHorizontal:0
        }}
        >

            {categories.map((category , index)=>{

let isActive = category.id==activeCategory;
let btnClass = isActive? ' bg-primary': ' bg-gray-200';
let textClass = isActive? ' font-semibold text-white': ' text-gray-500';


                return (
                    <View key={index} className="flex justify-center  items-center mr-6" >
                        <TouchableOpacity className={"px-4 py-2 bg-white600 rounded-xl shadow  "+ btnClass} onPress={()=>setActiveCategory(category.id)} >
                        {/* <Image style={{width: 45, height: 45}} source={category.image} 
                    /> */}
                            <Text className={"text-gray-dark"+textClass} >{category.name} </Text>
                        </TouchableOpacity>

                    </View>
                )
            })}

        </ScrollView>
      
    </View>
  )
}

export default MCategories