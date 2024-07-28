import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import imageMap from '../../data/imageMap';
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';

const SelectOutfit = () => {
    const influencer = true;
    const [isModalVisible, setModalVisible] = useState(false);
    const [outfits, setOutfits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState("Product has been added to outfit~");
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    const userId = "HS7XhtrBEONwYybKFNaUZXIw6wY2"
    //fetching outfits from db...
    const fetchOutfits = async () => {
        try {
            const userDoc = await firestore().collection('users').doc(userId).get();
            console.log(userDoc)
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.outfits && Array.isArray(userData.outfits)) {
                    setOutfits(userData.outfits);
                } else {
                    console.log('No outfits found or outfits field is not an array.');
                    setOutfits([]);
                }
            } else {
                console.log('No user found with the specified ID.');
                setOutfits([]);
            }
        } catch (error) {
            console.error('Error fetching user outfits:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchOutfits();
    }, []);

    const calculateTotalPrice = (productLinks) => {
        return productLinks.reduce((total, item) => total + item.price, 0);
    };

    const addToOutfit = async (product, outfit_name) => {
        try {
            const outfitToBeUpdated = outfits.find(o => o.name === outfit_name)
            // console.log(outfitToBeUpdated)
            if (outfitToBeUpdated) {
                const productExists = outfitToBeUpdated.productLinks.some(p => p.id === product.id);

                if (!productExists) {
                    const updatedProductLinks = [...outfitToBeUpdated.productLinks, product];
                    const updatedOutfit = { ...outfitToBeUpdated, productLinks: updatedProductLinks, totalPrice: calculateTotalPrice(updatedProductLinks) };

                    console.log(updatedOutfit)
                    const updatedOutfits = outfits.map(o => o.name === outfit_name ? updatedOutfit : o);

                    setOutfits(updatedOutfits);
                    console.log(outfits)
                    await firestore().collection('users').doc(userId).update({
                        outfits: updatedOutfits
                    });

                    setModalVisible(true);
                }
            } else {
                console.log('Product already exists in the outfit.');
            }

        } catch (error) {
            console.error('Error adding product to outfit:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        // navigation.navigate('Voting')
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
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, margin: 5 }} className="m-1 bg-white rounded-md">
                                <Carousel
                                    loop
                                    width={200} // Adjusted width to fit the image size
                                    height={200}
                                    autoPlay={true}
                                    data={item.productLinks}
                                    scrollAnimationDuration={1000}
                                    // onSnapToItem={(index) => console.log('current index:', index)}
                                    renderItem={({ item }) => (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            <Image
                                                source={imageMap[item.image]}
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
                                        className="bg-[#0B2447] rounded-full border-[#ffffff] h-[35px] w-[170px] justify-center items-center mx-auto mt-4"
                                        onPress={() => navigation.navigate('View Outfit', { outfit_name: item.name })}
                                    >
                                        <Text className="text-white text-sm font-bold">View Outfit Details</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="bg-pink-500 rounded-full border-[#ffffff] border-[7px] p-2 justify-center items-center mt-1"
                                        onPress={() => addToOutfit(product, item.name)}
                                    >
                                        <Text className="text-white text-center truncate text-sm font-bold">{`Add To "${item.name}"`}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
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
                modalText={modalText}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                        {/* <Text style={{ fontSize: 18, marginBottom: 10 }}>Thanks for participating!</Text> */}
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{modalText}</Text>
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