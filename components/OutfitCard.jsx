import { View, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'; 
import { TouchableOpacity } from "react-native-gesture-handler";

const OutfitCard = ({ item }) => {
  const navigation = useNavigation(); 
  return (
    <View className="flex-1 py-[30px] items-center w-[80%] shadow-2xl shadow-black my-[60px] bg-white border-[3px] rounded-[35px] border-[#DC0083]">
      <Image
        source={item.image}
        className="w-full h-[360px]"
        resizeMode="contain"
      />
      <Text className="pt-[10px] pb-[25px] text-xl font-bold">
        {item.title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-[250px] h-[54px] rounded-2xl bg-[#DC0083] items-center justify-center"
        onPress={() => navigation.navigate('UploadImage', { item })}
      >
        <Text className="text-white font-bold text-xl">Virtual Try-On</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutfitCard;
