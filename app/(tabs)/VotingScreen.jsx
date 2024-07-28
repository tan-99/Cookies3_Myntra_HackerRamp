import { View, Text, FlatList, TouchableOpacity, Image, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import firestore from "@react-native-firebase/firestore";

const VotingScreen = () => {

    const [dataa, setDataa] = useState([]);
    const [streaks, setStreaks] = useState(0);
    const [supercoins, setSupercoins] = useState(0);
    const [userId, setUserId] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            const usersCollection = await firestore().collection('users').get();

            let fetchedData = [];
            let totalStreaks = 0;
            let totalSupercoins = 0;

            usersCollection.forEach((doc) => {
                const user = doc.data();
                const userId = doc.id;
                console.log(userId)
                console.log(user)
                if (!user.influencer) {
                    totalStreaks += user.streaks || 0;
                }
                if (user.supercoins) {
                    totalSupercoins = user.supercoins || 0;
                }
                fetchedData.push({
                    userId: userId,
                    streaks: totalStreaks,
                })
            });

            setUserId(userId);
            setDataa(fetchedData);
            setStreaks(totalStreaks);
            setSupercoins(totalSupercoins);
        };

        fetchData();
    }, []);

    const data = [
        {
            userId: "1",
            username: "Kiran Hinduja",
            outfit: [
                {
                    image: require('../../assets/images/uploadedImg.jpg'),
                },
                {
                    image: require('../../assets/images/whiteFullSleeve.jpg'),
                    title: "White Full Sleeves Top",
                    price: 880,
                    category: "Topwear",
                },
                {
                    image: require('../../assets/images/BlueSkirt.jpg'),
                    title: "Indian Blue Skirt",
                    price: 1195,
                    category: "Bottomwear",
                },
            ],
            caption: "☀️Comfy Summer Outfit!☀️",
            votes: 156,
            totalPrice: 2075,
        },
        {
            userId: "2",
            username: "Shivani",
            outfit: [
                {
                    image: require('../../assets/images/contestImg2.jpg'),
                },
                {
                    image: require('../../assets/images/whiteFullSleeve.jpg'),
                    title: "White Full Sleeves Top",
                    price: 750,
                    category: "Topwear",
                },
                {
                    image: require('../../assets/images/BlueSkirt.jpg'),
                    title: "Indian Blue Skirt",
                    price: 1250,
                    category: "Bottomwear",
                },
            ],
            caption: "Summer in Style!🌻☀️",
            votes: 134,
            totalPrice: 2000,
        },
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity className={`mx-4 bg-blue-100 rounded-md border-2 border-gray-300 mt-3`}>
            <View className={'flex flex-row items-center rounded-t-md bg-white py-3 px-3 shadow'}>
                <Image
                    source={require('../../assets/images/user.png')}
                    className={'w-10 h-10 rounded-full mr-4'}
                />
                <View>
                    <Text className={'font-bold'}>{item.username}</Text>
                    <Text>Posted</Text>
                </View>
            </View>
            <View className={`flex flex-1 justify-center items-center`}>
                <Carousel
                    width={350} // Adjusted width to fit the image size
                    height={350}
                    autoPlay={false}
                    data={item.outfit}
                    scrollAnimationDuration={1000}
                    // onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item }) => (
                        <View className="relative">
                            <Image
                                source={item.image}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                            {item.title && (
                                <View
                                    className="absolute bottom-0 left-0 right-0 bg-white p-2 rounded-t-lg"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
                                >
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="text-black font-bold">{item.title}</Text>
                                            <Text className="text-black">{item.price} INR</Text>
                                        </View>
                                        <TouchableOpacity className="bg-pink-500 p-2 rounded">
                                            <Text className="text-white">Visit Product</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>

                    )}
                />
            </View>
            <View className="bg-white rounded-b-md p-2">
                <View className="flex-col">
                    <View className="flex-row justify-between">
                        <Text className="text-md font-medium">
                            {item.caption}
                        </Text>
                        <Text className="text-md font-medium">
                            Total Cost: <Text className="text-gray-500">₹ {item.totalPrice}</Text>
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-md font-medium mt-3">
                            Total Votes: <Text className="text-pink-500">{item.votes}🔺</Text>
                        </Text>

                        <TouchableOpacity className={`bg-pink-500 mt-2 p-2 rounded`} onPress={() => handleVote(userId)}>
                            <Text className={`text-white text-center`}>Vote</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleVote = async (userId) => {
        setStreaks(prevStreaks => prevStreaks + 1);
        // console.log(userId)
        // try {
        //     const userRef = firestore().collection('users').doc(userId);
        //     await userRef.update({
        //         streaks: firestore.FieldValue.increment(1)
        //     });
        //     console.log(`Voted for user with ID: ${userId}`);
        // } catch (error) {
        //     console.error('Error updating streaks:', error);
        // }
    };

    useEffect(() => {
        if (streaks === 4) {
            setSupercoins(prev => prev + 5);
            setModalMessage('Congratulations! You have gained 5 supercoins.');
            setModalVisible(true);
        } else if (streaks === 12) {
            setSupercoins(prev => prev + 15);
            setModalMessage('Congratulations! You have gained 15 supercoins.');
            setModalVisible(true);
        }
    }, [streaks]);

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View className={`flex-1 p-2`}>
            <View className="flex-row justify-between">
                <View>
                    <Text>Time Left</Text>
                </View>
                <View className="bg-white p-2.5 rounded-lg border-2 border-gray-300">
                    <Text className="italic font-medium">Streaks: <Text className='not-italic'>👠</Text>{streaks}</Text>
                </View>
            </View>
            <Text className={`text-center text-lg font-bold mb-1`}>Theme of the week:</Text>
            <Text className={`italic text-center text-2xl font-bold mb-4`}>☀️Summer Essentials☀️</Text>
            <FlatList
                data={data}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId}
                showsVerticalScrollIndicator={false}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{modalMessage}</Text>
                        <Image
                            source={require("../../assets/images/supercoins.png")}
                            className="w-20 h-20 animate-bounce"
                            resizeMode='contain'
                        />
                        <Text>Now you have {supercoins} supercoins in total!</Text>
                        <TouchableOpacity className="bg-[#0B2447] rounded-full border-gray-400 border-[3px] h-[40px] w-[100px] justify-center items-center mt-3" title="Close" onPress={closeModal}>
                            <Text className="text-white font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default VotingScreen