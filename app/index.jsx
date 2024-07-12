import { ScrollView, View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    // <View className="flex-1 items-center justify-center">

    // </View>
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-3xl text-pink-500">Myntra</Text>
          <StatusBar style='auto' />
          <Link href="/explore" className="text-lg text-black">Go to Home</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index