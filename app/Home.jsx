import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const navigation = useNavigation(); 

  const handleGoogleSignIn = () => {
    // Handle Google Sign In logic here
  };

  const handlePhoneSignIn = () => {
    navigation.navigate('SignIn'); 
  };

  return (
    <View className="flex-1 flex-col items-center justify-center bg-[#f5f5f5]">
      <Image className="h-[200px] w-[300px] mb-[90px]" source={require('../assets/images/myntra-logo.png')} />
      <CustomButton imgSource={require('../assets/images/google-icon.png')} text="SIGN IN WITH GOOGLE" handlePress={handleGoogleSignIn} />
      <CustomButton imgSource={require('../assets/images/phone-icon.png')} text="SIGN IN WITH PHONE" handlePress={handlePhoneSignIn} />
      <TouchableOpacity onPress={() => {navigation.navigate('Dummy')}}>
        <Text>Go to Dummy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('UserInfo', { })}}>
        <Text>Go to User Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
