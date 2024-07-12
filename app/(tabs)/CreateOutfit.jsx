import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateOutfit = () => {

    const [outfitName, setOutfitName] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;

    const createOutfit = () => {
        const newOutfit = { name: outfitName, items: [product] };
        // addOutfit(newOutfit);
        navigation.navigate('explore');
    };

    return (
        <View>
            <Text>Create New Outfit</Text>
            <TextInput
                placeholder="Outfit Name"
                value={outfitName}
                onChangeText={setOutfitName}
            />
            <Button title="Create Outfit" onPress={createOutfit} />
        </View>
    )
}

export default CreateOutfit