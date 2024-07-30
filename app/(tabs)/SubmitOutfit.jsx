import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import imageMap from '../../data/imageMap';

const SubmitOutfit = ({ route, navigation }) => {
  const { submission } = route.params;
  const [caption, setCaption] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userDoc = await firestore().collection('users').doc('HS7XhtrBEONwYybKFNaUZXIw6wY2').get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log('User not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (submission) {
        const data = await fetchUserData();
        setUserData(data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      // Fetch current submissions from Firestore
      const contestDoc = await firestore().collection('contests').doc('9NPfnKczmW7bm9Q6oTeU').get();
      if (!contestDoc.exists) {
        Alert.alert('Error', 'Contest does not exist.');
        return;
      }

      const contestData = contestDoc.data();
      const existingSubmissions = contestData.submissions || [];

      // Check if userId already exists in the submissions array
      const userAlreadySubmitted = existingSubmissions.some(submission => submission.userId === 'HS7XhtrBEONwYybKFNaUZXIw6wY2');

      if (userAlreadySubmitted) {
        Alert.alert('Error', 'You have already submitted an outfit to this contest.');
        return;
      }

      // Proceed with submission
      const submissionData = {
        ...submission,
        caption,
        votes: 0,
        dateOfPost: new Date().toISOString(),
        username: userData.name,
        userId: 'HS7XhtrBEONwYybKFNaUZXIw6wY2',
      };

      console.log(submissionData);

      await firestore().collection('contests').doc('9NPfnKczmW7bm9Q6oTeU').update({
        submissions: firestore.FieldValue.arrayUnion(submissionData),
      });

      Alert.alert('Success', 'Your outfit has been submitted to the contest!');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting outfit:', error);
      Alert.alert('Error', 'There was a problem submitting your outfit. Please try again.');
    }
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Product Links:</Text>
          {submission.productLinks.map((product, index) => (
            <View className="flex-row items-center bg-white p-2 mt-2">
              <Image source={imageMap[product.image]} style={{ width: 100, height: 100 }} />
              <View className="mx-2">
                <Text className="font-bold">{product.title}</Text>
                <Text>₹ {product.price}</Text>
              </View>
            </View>))}
          <View className="flex flex-row justify-between bg-white p-1 my-2">
            <Text className="text-lg font-semibold">Total Price:</Text>
            <Text className="text-lg font-semibold">₹ {submission.totalPrice}</Text>
          </View>
          {submission.uploadedImg && (
            <View className="flex-col items-center border-2 border-gray-300 rounded-md my-3 p-2 bg-white">
              <Text>Uploaded Image:</Text>
              <Image source={imageMap[submission.uploadedImg]} style={{ width: 200, height: 200, marginTop: 10 }} />
            </View>
          )}
        </View>

        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
          placeholder="Add a caption"
          value={caption}
          onChangeText={setCaption}
        />

        <TouchableOpacity
          style={{ backgroundColor: '#0B2447', padding: 15, borderRadius: 5 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SubmitOutfit;
