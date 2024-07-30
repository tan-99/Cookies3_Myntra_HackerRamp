import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const outfits = [
    {
        id: 1,
        title: 'Summer Dress',
        image: require('../../assets/images/summerDress.jpg'),
        description: 'Perfect for a sunny day!',
        originalPrice: '₹1500',
        discountedPrice: '₹1299',
    },
    {
        id: 2,
        title: 'Shoulder Bag',
        image: require('../../assets/images/shoulderBag.jpg'),
        description: 'Stay cool and stylish.',
        originalPrice: '₹1100',
        discountedPrice: '₹900',
    },
    {
        id: 3,
        title: 'Beach Shoes',
        image: require('../../assets/images/FlipFlops.jpg'),
        description: 'Stay cool and stylish.',
        originalPrice: '₹900',
        discountedPrice: '₹700',
    },
];

const trendingItems = [
    {
        id: 1,
        title: 'Trending Now: Floral Dresses',
        image: require('../../assets/images/LoosePants.jpg'),
    },
    {
        id: 2,
        title: 'Hot Picks: Sunglasses',
        image: require('../../assets/images/LoosePants.jpg'),
    },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const navigateToContests = () => {
        navigation.navigate('Contests', {
            screen: 'Contests',
        });
    };
    return (
        <ScrollView className="flex-1 bg-white p-4">
            {/* Men and Women Section */}
            <View className="flex-row justify-around mb-4">
                <TouchableOpacity className="bg-pink-500 py-2 px-4 rounded-full">
                    <Text className="text-white font-bold">Men</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-pink-500 py-2 px-4 rounded-full">
                    <Text className="text-white font-bold">Women</Text>
                </TouchableOpacity>
            </View>

            {/* Dummy Search Bar */}
            <View className="flex-row items-center bg-gray-100 p-2 rounded-full mb-4">
                <TextInput
                    placeholder="Search for outfits..."
                    className="flex-1 p-2"
                />
                <TouchableOpacity className="bg-pink-500 p-2 rounded-full">
                    <Text className="text-white font-bold">Go</Text>
                </TouchableOpacity>
            </View>

            {/* Outfit of the Week Section */}
            <View className="bg-gray-100 p-4 rounded-lg shadow mb-6">
                <Text className="text-2xl font-bold text-pink-700 mb-4">Outfit of the Week</Text>
                <TouchableOpacity onPress={navigateToContests}>
                    <View className="flex-col items-center bg-yellow-100 p-4 rounded-lg mb-4">
                        <Text className="font-bold">Theme of the Week:</Text>
                        <Text className="text-2xl font-bold text-orange-400">Summer Essentials</Text>
                        <Text className="font-bold">Participate Now!</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text className="font-bold text-lg my-2">Last week's winning outfit!</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {outfits.map(outfit => (
                        <TouchableOpacity key={outfit.id} className="mr-4 w-48 bg-white p-4 rounded-lg shadow">
                            <Image source={outfit.image} className="w-40 h-40 rounded-full mx-auto" />
                            <Text className="text-lg font-semibold mt-2 text-center text-dark-gray-700">{outfit.title}</Text>
                            <Text className="text-sm text-gray-600 text-center mb-1">{outfit.description}</Text>
                            <View className="flex-row justify-center items-center mt-2">
                                <Text className="text-sm text-gray-500 line-through mr-2">{outfit.originalPrice}</Text>
                                <Text className="text-sm text-sea-green-500 font-bold">{outfit.discountedPrice}</Text>
                            </View>
                            <TouchableOpacity className="bg-pink-500 mt-4 p-2 rounded-full">
                                <Text className="text-white text-center">Shop Now</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Text className="text-2xl font-bold text-pink-700 my-4">Trending - Explore</Text>
            <View className="flex-row flex-wrap justify-between">
                {trendingItems.map(item => (
                    <TouchableOpacity key={item.id} className="w-1/2 mb-4 p-2 bg-gray-100 rounded-lg shadow">
                        <Image source={item.image} className="w-full h-40 rounded-lg" />
                        <Text className="text-lg font-semibold mt-2 text-center text-dark-gray-700">{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
