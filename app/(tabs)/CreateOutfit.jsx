import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateOutfit = () => {

    const [outfitName, setOutfitName] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const influencer = true;

    const createOutfit = () => {
        // const newOutfit = { name: outfitName, items: [product] };
        // addOutfit(newOutfit);
        navigation.navigate('Explore');
    };

    return (
        <View className="flex-1 p-5 justify-center">
            <Text className="text-2xl font-bold text-center mb-5">Create New Outfit</Text>
            <TextInput
                className="border border-gray-300 rounded p-3 mb-5 text-base"
                placeholder="Outfit Name"
                value={outfitName}
                onChangeText={setOutfitName}
            />
            <TouchableOpacity
                className="bg-pink-600 py-3 rounded items-center"
                onPress={createOutfit}
            >
                <Text className="text-white text-lg font-bold">Create Outfit</Text>
            </TouchableOpacity>        
        </View>
    )
}

export default CreateOutfit;