import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageMap from '../../data/imageMap';
import SubmitOutfit from './SubmitOutfit';

const ViewOutfitDetails = ({ route, navigation }) => {
    const { outfit_name } = route.params;
    const [outfit, setOutfit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contest, setContest] = useState(null);

    // const getContestStatus = (startDate) => {
    //     const currentDate = new Date();
    //     const start = startDate;
    //     const diffTime = Math.abs(currentDate - start);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     console.log(currentDate)
    //     console.log(start)
    //     console.log(diffTime)
    //     console.log(diffDays)

    //     // if (diffDays <= 5) {
    //     //     return 'submissions_open';
    //     // } else if (diffDays > 5 && diffDays <= 7) {
    //     //     return 'voting_open';
    //     // } else {
    //     //     return 'contest_closed';
    //     // }
    // };

    const handlePress = () => {
        if (!contest) {
            Alert.alert('No contest available.');
            return;
        }
        console.log(contest.startDate);
        const status = getContestStatus(contest.startDate);
        if (status === 'submissions_open') {
            navigation.navigate('Submit Outfit', { submission: outfit });
        } else {
            Alert.alert('Submission period is over.');
        }
    };

    useEffect(() => {
        const fetchOutfit = async () => {
            try {
                const userDoc = await firestore().collection('users').doc('HS7XhtrBEONwYybKFNaUZXIw6wY2').get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData && Array.isArray(userData.outfits)) {
                        const matchingOutfit = userData.outfits.find((outfit) => outfit.name === outfit_name);
                        if (matchingOutfit) {
                            const totalPrice = calculateTotalPrice(matchingOutfit.productLinks);
                            const outfitWithPrice = { ...matchingOutfit, totalPrice: totalPrice };
                            setOutfit(outfitWithPrice);
                        }
                    } else {
                        console.log('No outfits found or outfits field is not an array.');
                        setOutfit([]);
                    }
                } else {
                    console.log('No outfit found for the user');
                    setOutfit([]);
                }
            } catch (error) {
                console.error('Error fetching outfit:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchContest = async () => {
            try {
                const contestRef = await firestore().collection('contests').doc('9NPfnKczmW7bm9Q6oTeU').get();
                if (contestRef.exists) {
                    setContest(contestRef.data());
                } else {
                    console.log('Contest not found.');
                }
            } catch (error) {
                console.error('Error fetching contest:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContest();
        fetchOutfit();
    }, [outfit_name]);

    const deleteItem = async (itemToDelete) => {
        if (outfit) {
            const updatedProductLinks = outfit.productLinks.filter(item => item.id !== itemToDelete.id);
            const updatedOutfit = {
                ...outfit,
                productLinks: updatedProductLinks,
                totalPrice: calculateTotalPrice(updatedProductLinks),
            };

            setOutfit(updatedOutfit);
            await updateOutfitInDatabase(updatedOutfit);
        }
    };

    const calculateTotalPrice = (productLinks) => {
        return productLinks.reduce((total, item) => total + item.price, 0);
    };

    const updateOutfitInDatabase = async (updatedOutfit) => {
        try {
            const userDoc = await firestore().collection('users').doc('HS7XhtrBEONwYybKFNaUZXIw6wY2');
            await userDoc.update({
                outfits: firestore.FieldValue.arrayRemove(outfit),  // Remove old outfit
            });
            await userDoc.update({
                outfits: firestore.FieldValue.arrayUnion(updatedOutfit),  // Add updated outfit
            });
        } catch (error) {
            console.error('Error updating outfit in database:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ flexDirection: "column", padding: 20 }}>
            <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-2">
                    <TouchableOpacity
                        className="bg-blue-800 p-1 rounded-md"
                    // onPress={() => deleteItem(item)}
                    >
                        <Text className="text-sm text-white font-semibold">✎</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>"{outfit_name}"</Text>
                </View>
                <View>
                    <TouchableOpacity
                        className="bg-red-700 p-1 rounded-md"
                    // onPress={() => deleteItem(item)}
                    >
                        <Text className="text-sm text-white font-semibold">Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={outfit.productLinks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className="bg-white p-2 mt-2" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View className="flex-row items-center">
                            <Image source={imageMap[item.image]} style={{ width: 100, height: 100 }} />
                            <View className="mx-2">
                                <Text className="font-bold">{item.title}</Text>
                                <Text>₹ {item.price}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            className="border-2 border-red-500 bg-red-100 p-1 rounded-md"
                            onPress={() => deleteItem(item)}
                        >
                            <Text className="text-red-500 font-semibold">Delete Item</Text>
                        </TouchableOpacity>
                    </View>
                )}
                className="my-2"
            />
            <View className="flex flex-row justify-between bg-white p-1 my-2">
                <Text className="text-lg font-semibold">Total Price:</Text>
                <Text className="text-lg font-semibold">₹ {outfit.totalPrice}</Text>
            </View>

            {
                outfit.uploadedImg ? (
                    <View className="border-2 border-gray-200 rounded-lg bg-white flex flex-col items-center">
                        <Text className="text-lg mt-2">Uploaded Image:</Text>
                        <Image source={imageMap[outfit.uploadedImg]} style={{ width: 200, height: 200, marginBottom: 10 }} />

                        <View>
                            {outfit.totalPrice <= 3000 ? (
                                <View>
                                    <Text className="text-sm text-center mt-2">This outfit is elligible to be submitted in the ongoing contest. Make a submission ?</Text>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#0B2447', padding: 10, borderRadius: 5, marginVertical: 10 }}
                                        onPress={handlePress}
                                    >
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>Submit Outfit!</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Text className="text-sm text-center mt-2">This outfit is not elligible to be submitted in the ongoing contest.</Text>
                            )}
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text className="text-sm mt-4 text-red-700">*To submit this outfit for the contest, upload a photo of you in this outfit! </Text>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0B2447', padding: 10, borderRadius: 5, marginTop: 10 }}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

export default ViewOutfitDetails