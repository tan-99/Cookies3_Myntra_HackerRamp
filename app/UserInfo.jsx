import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native'; 

const RadioButton = ({ value, label, selectedValue, setSelectedValue }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedValue(value)}
      className={`option ${
        selectedValue === value ? "bg-[#DC0083]" : "bg-white"
      } rounded-full h-[45px] w-[82px] justify-center items-center mx-[4px]`}
    >
      <Text
        className={`${
          selectedValue === value ? "text-white" : "text-[#323232]"
        } span font-bold text-[16px]`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const UserInfo = ({ route }) => {
  const { uid } = route.params
  const [selectedValue, setSelectedValue] = useState("yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const saveDetails = async () => {
    try{
        await firestore().collection("users").doc(uid).set({
            name: name,
            email: email,
            influencer: selectedValue
        });
        navigation.navigate("(tabs)");
    } catch (error) {
        console.log("Error saving details: ", error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-[25px] font-bold text-[#DC0083] mb-[50px]">
        Complete Your Profile
      </Text>
      <Text className="font-bold text-[22px] text-[#323232] text-center px-[20px] mb-[25px]">
        Are you an influencer collaborating with us?
      </Text>
      <View className="wrapper flex-row items-center justify-between bg-white border-2 border-[#323232] rounded-full w-[185px] h-[60px] shadow-md mb-[50px]">
        <RadioButton
          value="yes"
          label="YES"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <RadioButton
          value="no"
          label="NO"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </View>
      <TextInput
        className="border-2 border-[#000000] px-[20px] w-[85%] h-[60px] rounded-[18px] font-bold text-[16px] mb-[40px] bg-white"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        multiline={false}
      ></TextInput>
      <TextInput
        className="border-2 border-[#000000] px-[20px] w-[85%] h-[60px] rounded-[18px] font-bold text-[16px] mb-[50px] bg-white"
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        multiline={false}
      ></TextInput>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[80px] w-[340px] justify-center items-center m-[15px]"
        onPress={saveDetails}
      >
        <View className="flex-1 flex-row items-center gap-[15px]">
          <Text className="text-[#ffffff] text-xl font-bold">CONTINUE</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo;
