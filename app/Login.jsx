import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null); // Updated initial state
  const navigation = useNavigation();

  const SignInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code: ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        navigation.navigate("Explore");
      } else {
        navigation.navigate("UserInfo", { uid: user.uid });
      }
    } catch (error) {
      console.log("Invalid Code: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 flex-col items-center py-[80px] px-[20px] bg-[#f5f5f5]">
        {!confirm ? (
          <>
            <Image
              className="h-[270px] w-[300px] my-[50px]"
              source={require("../assets/images/OTP-pink.png")}
            />
            <Text className="text-[23px] font-bold">Enter your Phone Number</Text>
            <Text className="font-bold text-[17px] mb-[30px] mt-[3px]">
              We will send you an OTP for confirmation
            </Text>
            <TextInput
              className="border-2 px-[25px] w-full mb-[20px] h-[60px] rounded-[16px] border-[#000000] justify-center"
              placeholder="e.g. +91 1234 5678 90"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[80px] w-[240px] justify-center items-center m-[15px]"
              onPress={SignInWithPhoneNumber}
            >
              <Text className="text-white text-lg font-bold">RECEIVE OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
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
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[80px] w-[240px] justify-center items-center m-[15px]"
              onPress={confirmCode}
            >
              <Text className="text-white text-lg font-bold">CONFIRM OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SignIn;
