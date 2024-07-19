import { TouchableOpacity, View, Text, Image } from "react-native";
import React from "react";

const CustomButton = ({ imgSource, text, handlePress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[80px] w-[340px] justify-center items-center m-[15px]"
      onPress={handlePress}
    >
      <View className="flex-1 flex-row items-center gap-[15px]">
        <Image className="h-[30px] w-[30px]" source={imgSource}></Image>
        <Text className="text-[#ffffff] text-lg font-bold">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
