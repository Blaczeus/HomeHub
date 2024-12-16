import React, {useState} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BookmarkScreen from '../screens/BookmarkScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen.js';

import {properties} from '../../data/properties';
import HomeIcon from '../../assets/images/tabicons/homeicon.png';
import BookmarkIcon from '../../assets/images/tabicons/Bookmarkicon.png';
import ChatIcon from '../../assets/images/tabicons/Chaticon.png';
import SettingsIcon from '../../assets/images/tabicons/Settingicon.png';
import GridIcon from '../../assets/images/tabicons/Gridicon.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTab({ setIsAuthenticated, userInfo}) {

  const getTabBarIcon = (icon, focused) => (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.focusedIndicator} />}
      <Image
        source={icon}
        style={[styles.iconStyle, { tintColor: focused ? '#3e84d6' : '#04364A' }]}
      />
    </View>
  );


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeScreen
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
            properties={properties}
          />
        )}
        options={{
          tabBarIcon: ({ focused }) => getTabBarIcon(HomeIcon, focused),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        children={() => <BookmarkScreen properties={properties} />}
        options={{
          tabBarIcon: ({ focused }) => getTabBarIcon(BookmarkIcon, focused),
        }}
      />
      <Tab.Screen
        name="Grid"
        children={() => <MapScreen properties={properties} />}
        options={{
          tabBarIcon: () => (
            <View style={styles.gridIconContainer}>
              <Image source={GridIcon} style={styles.gridIconStyle} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => getTabBarIcon(ChatIcon, focused),
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => getTabBarIcon(SettingsIcon, focused),
        }}
      >
        {() => (
          <SettingsScreen
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ setIsAuthenticated, userInfo }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Authenticated Tab Navigator */}
      <Stack.Screen name="Tabs">
        {() => (
          <BottomTab
            setIsAuthenticated={setIsAuthenticated}
            userInfo={userInfo}
          />
        )}
      </Stack.Screen>

      {/* Notifications Screen */}
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />

      {/* Property Details Screen */}
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 5,
    shadowBlur: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(62, 132, 214, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  iconStyle: {
    width: 25,
    height: 25,
    zIndex: 1,
  },
  gridIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#3e84d6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  gridIconStyle: {
    width: 30,
    height: 30,
  },
});
