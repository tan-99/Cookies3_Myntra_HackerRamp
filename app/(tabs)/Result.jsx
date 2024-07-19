// src/screens/ResultScreen.js

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ResultScreen = () => {
    const [resultImage, setResultImage] = useState(null);

    useEffect(() => {
        // Fetch the result image from the server after processing is done
        const fetchResultImage = async () => {
            try {
                const response = await fetch('http://localhost:5000/results/try-on.jpg');
                if (response.ok) {
                    const blob = await response.blob();
                    setResultImage(URL.createObjectURL(blob));
                } else {
                    console.error('Failed to fetch result image');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchResultImage();
    }, []);

    return (
        <View style={styles.container}>
            {resultImage ? <Image source={{ uri: resultImage }} style={styles.image} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
});

export default ResultScreen;
