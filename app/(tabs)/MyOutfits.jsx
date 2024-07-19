import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import OutfitCard from "../../components/OutfitCard";
import tops from '../../data/tops';

const { width, height } = Dimensions.get('screen');

const MyOutfits = () => {
  return (
      <View className="flex-1">
        <FlatList
          data={tops}
          horizontal
          pagingEnabled
          renderItem={({ item }) => {
            return <View style={{width, justifyContent: "center", alignItems: "center"}}>
            <OutfitCard
              item={item}
            /></View>
          }}
        />
      </View>
  )
}

export default MyOutfits;