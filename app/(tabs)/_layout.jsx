import { Image, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Tabs, Redirect } from 'expo-router'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './explore';
import MyOutfitsScreen from './MyOutfits';
import ProfileScreen from './profile';
import SelectOutfitScreen from './SelectOutfit';
import CreateOutfitScreen from './CreateOutfit';
import VotingScreen from './VotingScreen';
import ContestScreen from './Contests';
// import firestore from "@react-native-firebase/firestore";

import Icons from "../../constants/Icons";

const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const ContestStack = createStackNavigator();

const influencer = true;

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
}

function UserContestStackScreen() {
  return (
    <ContestStack.Navigator>
      <ContestStack.Screen name="Contests" component={ContestScreen} />
      <ContestStack.Screen name="Voting" component={VotingScreen} />
    </ContestStack.Navigator>
  )
}

// function InfluencerContestStackScreen() {
//   return (
//     <ContestStack.Navigator>
//       <ContestStack.Screen name="Contests" component={ContestScreen} />
//       <ExploreStack.Screen name="SelectOutfit" component={SelectOutfitScreen} />
//       <ExploreStack.Screen name="CreateOutfit" component={CreateOutfitScreen} />
//       <ContestStack.Screen name="Voting" component={VotingScreen} />
//     </ContestStack.Navigator>
//   )
// }

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={`items-center justify-center gap-2`}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={`${focused ? 'rgb(219, 39, 119)' : '#000000'}`}
        className={`w-6 h-6`}
      />
      <Text className={`${focused ? 'text-pink-600' : 'text-black'} text-sm`}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: true,
          tabBarStyle: {
            height: 70,
          },
        }}
      >
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStackScreen}
          options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Icons.exploreOutfits}
                color={color}
                name="Explore"
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyOutfits"
          component={MyOutfitsScreen}
          options={{
            title: 'Try On',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Icons.outfit}
                color={color}
                name="My Outfits"
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contests"
          component={UserContestStackScreen}
          options={{
            title: 'Contests',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Icons.contests}
                color={color}
                name="Contests"
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default TabsLayout