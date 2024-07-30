import { View, Text, FlatList, TouchableOpacity, Image, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import firestore from "@react-native-firebase/firestore";
import imageMap from '../../data/imageMap';
import ContestComp from '../../components/ContestComp';

const VotingScreen = () => {

    const [submissions, setSubmissions] = useState([]);
    const [streaks, setStreaks] = useState(0);
    const [votes, setVotes] = useState(0);
    const [supercoins, setSupercoins] = useState(0);
    const [userId, setUserId] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [timeRemaining, setTimeRemaining] = useState(null);
    const [contestEndDate, setContestEndDate] = useState(null);

    const calculateTimeRemaining = (endDate) => {
        const now = new Date();
        const end = new Date(endDate);
        const difference = end - now;

        if (difference <= 0) {
            return null; // Contest has ended
        }

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
        return timeLeft;
    };

    const formatTimeRemaining = (time) => {
        if (!time) return 'Contest has ended';

        return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                // Fetch the contest document
                const contestDoc = await firestore().collection('contests').doc('9NPfnKczmW7bm9Q6oTeU').get();

                if (contestDoc.exists) {
                    const contestData = contestDoc.data();
                    if (contestData && Array.isArray(contestData.submissions)) {
                        console.log(submissions)
                        setSubmissions(contestData.submissions);
                    } else {
                        console.log('No submissions found or submissions field is not an array.');
                    }
                } else {
                    console.log('Contest document not found.');
                }

                // Fetch user data to get streaks and supercoins
                const usersCollection = await firestore().collection('users').get();

                let totalStreaks = 0;
                let totalSupercoins = 0;

                usersCollection.forEach((doc) => {
                    const user = doc.data();
                    if (!user.influencer) {
                        totalStreaks += user.streaks || 0;
                    }
                    if (user.supercoins) {
                        totalSupercoins = user.supercoins || 0;
                    }
                });

                setStreaks(totalStreaks);
                setSupercoins(totalSupercoins);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchContestEndDate = async () => {
            try {
                const contestDoc = await firestore().collection('contests').doc('9NPfnKczmW7bm9Q6oTeU').get();
                if (contestDoc.exists) {
                    const contestData = contestDoc.data();
                    const endDate = contestData.endDate;
                    if (endDate) {
                        const endTimestamp = endDate.seconds * 1000 + endDate.nanoseconds / 1000000;
                        const endDateObject = new Date(endTimestamp);
                        setContestEndDate(endDateObject);
                    }
                } else {
                    console.error('Contest document not found');
                }
            } catch (error) {
                console.error('Error fetching contest end date:', error);
            }
        };

        fetchSubmissions();
        fetchContestEndDate();
    }, []);

    useEffect(() => {
        if (!contestEndDate) return; // Wait until the contest end date is fetched

        const updateTimer = () => {
            const timeLeft = calculateTimeRemaining(contestEndDate);
            setTimeRemaining(timeLeft);
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Initialize the timer immediately

        return () => clearInterval(timerInterval); // Cleanup on unmount
    }, [contestEndDate]);


    const renderItem = ({ item }) => {
        const carouselData = [
            { image: item.uploadedImg },
            ...item.productLinks
        ];
        return (
            <TouchableOpacity style={{ margin: 10, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Image
                        source={require('../../assets/images/user.png')}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                    />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                        <Text>Posted</Text>
                    </View>
                </View>
                <View className={`flex flex-1 justify-center items-center`}>
                    <Carousel
                        width={350}
                        height={300}
                        autoPlay={false}
                        data={carouselData}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ position: 'relative' }}>
                                    <Image
                                        source={imageMap[item.image]}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="contain"
                                    />
                                    {item.title && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <View className="flex-row justify-between">
                                                <View className="flex-col">
                                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                    <Text>{item.price} INR</Text>
                                                </View>
                                                <TouchableOpacity className="bg-pink-500 p-2 rounded">
                                                    <Text className="text-white">Visit Product</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.caption}</Text>
                    <Text style={{ fontSize: 16, marginVertical: 5 }}>
                        Total Cost: <Text style={{ color: 'gray' }}>₹ {item.totalPrice}</Text>
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 5 }}>
                        Total Votes: <Text style={{ color: 'pink' }}>{votes}🔺</Text>
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'pink', padding: 10, borderRadius: 5 }}
                        onPress={() => handleVote(item.userId)}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    const handleVote = async (userId) => {
        try {
            // Update user streaks
            setStreaks(prevStreaks => prevStreaks + 1);
            setVotes(prev => prev+1);
            // Uncomment and adjust according to your Firestore structure
            // const userRef = firestore().collection('users').doc(userId);
            // await userRef.update({
            //     streaks: firestore.FieldValue.increment(1)
            // });
            console.log(`Voted for user with ID: ${userId}`);
        } catch (error) {
            console.error('Error updating streaks:', error);
        }
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
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <View>
                    <ContestComp contestDocId="9NPfnKczmW7bm9Q6oTeU" size="small"/>
                </View>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }}>
                    <Text style={{ fontStyle: 'italic' }}>Streaks: <Text>👠</Text>{streaks}</Text>
                </View>
            </View>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Theme of the week:</Text>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>☀️Summer Essentials☀️</Text>

            {/* <Text className="mt-5 px-4 font-medium">Your Submission:</Text> */}
            <FlatList
                data={submissions}
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
                            source={require('../../assets/images/supercoins.png')}
                            style={{ width: 80, height: 80 }}
                            resizeMode='contain'
                        />
                        <Text>Now you have {supercoins} supercoins in total!</Text>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0B2447', padding: 10, borderRadius: 5, marginTop: 10 }}
                            onPress={closeModal}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default VotingScreen