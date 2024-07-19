import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Dummy = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 flex-col items-center py-[80px] px-[20px] bg-[#f5f5f5]">
        <Image
          className="h-[270px] w-[300px] my-[50px]"
          source={require("../assets/images/OTP-orange.png")}
        />
        <Text className="text-[22px] font-bold mb-[30px]">
          Enter the OTP received
        </Text>
        <TextInput
          className="border-2 px-[25px] w-full mb-[20px] h-[60px] rounded-[16px] border-[#000000] justify-center"
          placeholder="e.g. 123456"
          keyboardType="number-pad"
        />
        <TouchableOpacity className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[80px] w-[240px] justify-center items-center m-[15px]">
          <Text className="text-white text-lg font-bold">CONFIRM OTP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dummy;
