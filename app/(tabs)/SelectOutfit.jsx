import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SelectOutfit = () => {
    const [outfits, setOutfits] = useState([
        { id: '1', name: 'Outfit 1', items: [] },
    ]);
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;

    const addToOutfit = (outfit) => {
        if (outfit.items.find(item => item.id === product.id)) {
            Alert.alert('Product already added', 'This product is already in the outfit.');
            return;
        }
        
        // Update the selected outfit with the new product
        const updatedOutfits = outfits.map(o => {
            if (o.id === outfit.id) {
                return { ...o, items: [...o.items, product] };
            }
            return o;
        });
        setOutfits(updatedOutfits);
        // Navigate back or to another screen after adding the product
        navigation.navigate('Explore'); 
    };

    return (
        <View>
            <FlatList
                data={outfits}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Button title={`Add to "${item.name}"`} onPress={() => addToOutfit(item)} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <Button
                title="Create New Outfit"
                onPress={() => navigation.navigate('CreateOutfit', { product })}
            />
        </View>
    )
}

export default SelectOutfit