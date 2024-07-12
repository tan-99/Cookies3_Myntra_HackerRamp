import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-1 rounded-lg">
            <Image
                source={require("../assets/images/girl1.png")}
                className="w-full h-[290px]"
                resizeMode='contain'
            />
            <View className="flex flex-row justify-between">
                <View className="ml-2">
                    <Text className="text-md font-bold">{item.title}</Text>
                    <Text className="text-xs text-gray-500 truncate">Some details...</Text>
                    <Text className="text-md text-gray-500 truncate font-bold">₹ {item.price}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SelectOutfit", { product: item })}
                    className="flex flex-row bg-white border-2 border-pink-600 drop-shadow-md rounded-md mr-2 mt-3 h-7 p-0.5"
                >
                    <Image
                        source={require('../assets/icons/outfit.png')}
                        className="h-4 w-4 mr-2 ml-1"
                    />
                    <Text className="text-sm text-black">Add</Text>
                </TouchableOpacity>
                {/* <View style={styles.container}>
                    <Image
                        source={require('../assets/icons/outfit.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Add</Text>
                </View> */}
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 8,
//         backgroundColor: '#000', // Replace with your background color
//         borderRadius: 8,
//     },
//     icon: {
//         width: 20,
//         height: 20,
//         marginRight: 8,
//         color: "#fff",
//     },
//     text: {
//         fontSize: 14,
//         color: '#fff',
//         fontWeight: '600',
//     },
// });

export default ProductCard