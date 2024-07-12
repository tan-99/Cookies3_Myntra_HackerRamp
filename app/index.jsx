import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import SignIn from "./Login";
import UserInfo from "./UserInfo";
import Dummy from './dummy';
import Explore from './Explore';
import { registerRootComponent } from "expo";
// import { Stack } from 'expo-router';

const Stack = createStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="UserInfo"
                    component={UserInfo}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="Dummy"
                    component={Dummy}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="Explore"
                    component={Explore}
                    options={{ headerShown: false }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

registerRootComponent(Main);