import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';

const SelectOutfit = () => {
    const influencer = true;
    const [isModalVisible, setModalVisible] = useState(false);
    const [outfits, setOutfits] = useState([
        {
            id: '1', name: 'Summers', items: [
                {
                    id: 1,
                    image: require('../../assets/images/SummerTops.jpg'),
                    title: 'Cotton Top',
                    price: 1299.00, // Price in INR
                    category: 'Top Wear'
                },
                {
                    id: 2,
                    image: require('../../assets/images/LoosePants.jpg'),
                    title: 'Loose Pants',
                    price: 899.00, // Price in INR
                    category: 'Bottom Wear'
                },
                {
                    id: 3,
                    image: require('../../assets/images/FlipFlops.jpg'),
                    title: 'Flip Flops',
                    price: 499.00, // Price in INR
                    category: 'Footwear'
                }
            ]
        },
        {
            id: '3', name: 'Summer Essentials', items: [
                {
                    id: 1,
                    image: require('../../assets/images/uploadedImg.jpg'),
                    title: 'Formal Top',
                    price: 1299.00, // Price in INR
                    category: 'Top Wear'
                },
                {
                    id: 2,
                    image: require('../../assets/images/whiteFullSleeve.jpg'),
                    title: 'Formal Pants',
                    price: 899.00, // Price in INR
                    category: 'Bottom Wear'
                },
                {
                    id: 3,
                    image: require('../../assets/images/BlueSkirt.jpg'),
                    title: 'Heel Sandals',
                    price: 499.00, // Price in INR
                    category: 'Footwear'
                }
            ]
        },
        {
            id: '4', name: 'Formals', items: [
                {
                    id: 1,
                    image: require('../../assets/images/formalShirt.jpg'),
                    title: 'Formal Top',
                    price: 1299.00, // Price in INR
                    category: 'Top Wear'
                },
                {
                    id: 2,
                    image: require('../../assets/images/formalPants.jpg'),
                    title: 'Formal Pants',
                    price: 899.00, // Price in INR
                    category: 'Bottom Wear'
                },
                {
                    id: 3,
                    image: require('../../assets/images/formalShoes.jpg'),
                    title: 'Heel Sandals',
                    price: 499.00, // Price in INR
                    category: 'Footwear'
                }
            ]
        },
        {
            id: '4', name: 'Basics', items: [
                {
                    id: 1,
                    image: require('../../assets/images/BasicShirt.jpg'),
                    title: 'Basic Top',
                    price: 1299.00, // Price in INR
                    category: 'Top Wear'
                },
                {
                    id: 2,
                    image: require('../../assets/images/BasicJeans.jpg'),
                    title: 'Formal Pants',
                    price: 899.00, // Price in INR
                    category: 'Bottom Wear'
                },
                {
                    id: 3,
                    image: require('../../assets/images/formalShoes.jpg'),
                    title: 'Heel Sandals',
                    price: 499.00, // Price in INR
                    category: 'Footwear'
                }
            ]
        },
    ]);
    const navigation = useNavigation();
    const route = useRoute();
    // const { product } = route.params;

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('Voting')
    };
    
    // const addToOutfit = (outfit) => {

    //     // Navigate back or to another screen after adding the product
    //     navigation.navigate('Explore');
    // };
    return (
        <View>
            <View className="flex-row mt-2">
                <FlatList
                    data={outfits}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 5 }} className="m-1 bg-white rounded-md">
                            <Carousel
                                loop
                                width={200} // Adjusted width to fit the image size
                                height={200}
                                autoPlay={true}
                                data={item.items}
                                scrollAnimationDuration={1000}
                                onSnapToItem={(index) => console.log('current index:', index)}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <Image
                                            source={item.image}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                )}
                            />
                            <View className="mx-2 my-3">
                                {/* <Text>{item.name}</Text> */}
                                {/* <Button title=  /> */}
                                <TouchableOpacity
                                    className="bg-pink-500 rounded-full border-[#ffffff] border-[7px] p-2 justify-center items-center mt-4"
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text className="text-white text-center truncate text-sm font-bold">{`Submit "${item.name}"`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <TouchableOpacity
                className="bg-[#0B2447] rounded-full border-[#ffffff] border-[7px] h-[70px] w-[200px] justify-center items-center mx-auto mt-4"
                onPress={() => navigation.navigate('CreateOutfit')}
            >
                <Text className="text-white text-lg font-bold">Create New Outfit</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Thanks for participating!</Text>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Your outfit for the theme "Summer Essentials" has been submitted.</Text>
                        <TouchableOpacity
                            className="bg-[#0B2447] rounded-full border-gray-400 border-[3px] h-[40px] w-[100px] justify-center items-center mt-3"
                            title="Close"
                            onPress={closeModal}
                        >
                            <Text className="text-white font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>

    )
}

export default SelectOutfit