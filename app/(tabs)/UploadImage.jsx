import React, { useState, useEffect } from "react";
import { View, Image, Alert, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const NGROK_PUBLIC_URL = "https://71f8-34-87-92-253.ngrok-free.app";  // Replace with your actual Ngrok public URL

const convertToJpeg = async (uri) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult.uri;
};

const uploadImages = async (personImageUri, clothImageUri) => {
  const personJpegUri = await convertToJpeg(personImageUri);
  const clothJpegUri = await convertToJpeg(clothImageUri);

  const formData = new FormData();
  formData.append("person_image", {
    uri: personJpegUri,
    type: "image/jpeg",
    name: "person.jpg",
  });
  formData.append("cloth_image", {
    uri: clothJpegUri,
    type: "image/jpeg",
    name: "cloth.jpg",
  });

  try {
    const response = await fetch(`${NGROK_PUBLIC_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = await response.text();
    console.log("Upload Response:", result);
  } catch (error) {
    console.error("Error uploading images:", error);
    Alert.alert("Error uploading images. Please check your network and try again.");
  }
};

const fetchResult = async () => {
  try {
    const response = await fetch(`${NGROK_PUBLIC_URL}/result`);
    if (response.ok) {
      const blob = await response.blob();
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      console.error("Result not ready");
      Alert.alert("Result not ready. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching result:", error);
    Alert.alert("Error fetching result. Please try again later.");
  }
};

const UploadImage = () => {
  const route = useRoute();
  const { item } = route.params;
  const [personImage, setPersonImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  useEffect(() => {
    const getClothImageUri = async () => {
      if (item.image) {
        const asset = Asset.fromModule(item.image);
        await asset.downloadAsync();
        setClothImage(asset.uri);
      }
    };
    getClothImageUri();
  }, [item.image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setPersonImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (personImage && clothImage) {
      console.log("Person Image URI:", personImage);
      console.log("Cloth Image URI:", clothImage);
      await uploadImages(personImage, clothImage);
      const imageUrl = await fetchResult();
      setResultImage(imageUrl);
    } else {
      Alert.alert("Please select both images.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {resultImage ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#DC0083', marginBottom: 10, textAlign: 'center' }}>
            Here's your result!
          </Text>
          <Image source={{ uri: resultImage }} style={{ width: 200, height: 200, marginTop: 20 }} />
        </>
      ) : (
        <>
          {!personImage ? (
            <>
              <Image
              className="h-[300px] w-[320px] my-[50px]"
              source={require("../../assets/images/upload-image.png")}
            />
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                Clothing item selected!
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
                Now, please choose an image of yourself.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DC0083',
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 15,
                  marginBottom: 20,
                }}
                onPress={pickImage}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  Choose Image
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#DC0083', marginBottom: 10, textAlign: 'center' }}>
                Preview
              </Text>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                {clothImage && (
                  <Image source={{ uri: clothImage }} style={{ width: 200, height: 250, marginBottom: 10 }} />
                )}
                {personImage && (
                  <Image source={{ uri: personImage }} style={{ width: 200, height: 250 }} />
                )}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DC0083',
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 15,
                  marginBottom: 20,
                  marginTop: 5,
                }}
                onPress={pickImage}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  Change Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0B2447',
                  borderRadius: 50,
                  borderColor: '#ffffff',
                  borderWidth: 7,
                  height: 80,
                  width: 340,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 15,
                }}
                onPress={handleUpload}
              >
                <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
                  DONE
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default UploadImage;
