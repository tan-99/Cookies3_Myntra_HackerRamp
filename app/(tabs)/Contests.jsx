import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ContestComp from '../../components/ContestComp';

const Contests = () => {
    const navigation = useNavigation();
    const influencer = false;

    return (
        <View className="flex-1">
            <TouchableOpacity className="bg-white h-64" onPress={() => {
                if (influencer) {
                    navigation.navigate('SelectOutfit');
                } else {
                    navigation.navigate('Voting');
                }
            }}>
                <Image
                    source={require('../../assets/images/ContestPoster.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View className="mt-4 p-4">
                <Text className="text-lg text-center">The Theme of the week is...</Text>
                <Text className="text-3xl font-serif mb-2 text-center">Summer Essentials</Text>
                <View>
                    <ContestComp contestDocId="9NPfnKczmW7bm9Q6oTeU" size="large" />
                </View>
            </View>
            <View className="h-60 m-4 border border-gray-300 rounded-lg">
                <ScrollView>
                    <View className="mt-4 mx-2">
                        <Text className="text-lg font-bold">🌟 Rules for influencers:</Text>
                        <View className="ml-4 mt-2">
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">1.</Text>
                                <Text className="text-justify w-80">You must have a minimum of 500 followers on Myntra.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">2.</Text>
                                <Text className="text-justify w-80">Eligible to create outfits using only products sold on Myntra.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">3.</Text>
                                <Text className="text-justify w-80">The total cost of the outfit must be below Rs. 3000.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">4.</Text>
                                <Text className="text-justify w-80">Submit your outfit for the contest within the designated timeframe.</Text>
                            </View>
                        </View>
                    </View>
                    <View className="mt-4 mx-2 p-2">
                        <Text className="text-lg font-bold">🌟 Rules for Myntra Users:</Text>
                        <View className="ml-4 mt-2">
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">1.</Text>
                                <Text className="text-justify w-80">All Myntra users are eligible to vote for their favorite outfit of the week.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">2.</Text>
                                <Text className="text-justify w-80">Cast your vote for the outfits you like the most during the contest week.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">3.</Text>
                                <Text className="text-justify w-80">Maintain a one-month participation streak to earn 5 supercoins.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">4.</Text>
                                <Text className="text-justify w-80">Maintain a three-month participation streak to earn 25 supercoins.</Text>
                            </View>
                            <View className="flex-row mb-1">
                                <Text className="font-bold mr-2">5.</Text>
                                <Text className="text-justify w-80">Users who voted for the winning outfit will receive 2 supercoins.</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Contests;
