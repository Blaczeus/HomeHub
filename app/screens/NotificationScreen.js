import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeInLeft } from 'react-native-reanimated';


export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Feature Added!',
      message: 'Check out the new dark mode option in settings.',
      timeSent: new Date().getTime() - 2600000,
      sender: 'HomeHub Support Team',
      isRead: true,
      destination: 'Settings',
    },
    {
      id: '2',
      title: 'Task Reminder',
      message: 'Don’t forget to complete your pending tasks.',
      timeSent: new Date().getTime() - 86400000,
      sender: 'TaskBot',
      isRead: true,
      destination: 'Chat',
    },
    {
      id: '3',
      title: 'Welcome!',
      message: 'Thanks for joining the app. Let’s stay productive!',
      timeSent: new Date().getTime() - 7200000,
      sender: 'HomeHub Support Team',
      isRead: false,
      destination: 'Home',
    },
  ]);

  const timeAgo = (timestamp) => {
    const now = new Date().getTime();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    if (diffInMinutes <= 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours <= 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const renderRightActions = (id) => (
    <View className="flex p-4 flex-row ">
      <TouchableOpacity
        className="bg-red-500 p-3 rounded-l-3xl mr-3"
        onPress={() => deleteNotification(id)}
      >
        <Feather name="trash-2" size={24} color="white" className="" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-500 p-3 rounded-r-3xl"
        onPress={() => muteNotification(id)}
      >
        <Feather name="bell-off" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const deleteNotification = (id) =>
    setNotifications(notifications.filter((item) => item.id !== id));

  const muteNotification = (id) => {
    Alert.alert('Muted', 'You have muted notifications from this sender.');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      {/* <Animated.View entering={FadeInLeft.delay( 100 * item.id ).duration( 1000 ).springify()}> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Tabs', { screen: item.destination })}
          className={`flex-1 w-full p-5 my-3 rounded-3xl drop-shadow-2xl ${
            item.isRead ? 'bg-gray-200' : 'bg-cyan-500'
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              item.isRead ? 'text-gray-800' : 'text-white'
            }`}
          >
            {item.title}
          </Text>
          <Text
            className={`text-base ${
              item.isRead ? 'text-gray-600' : 'text-white'
            } mt-2`}
          >
            {item.message}
          </Text>
          <View className="flex-row justify-between mt-2">
            <Text 
              className={`text-base font-light ${
                item.isRead ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {timeAgo(item.timeSent)}
            </Text>
            <Text 
              className={`text-base font-light ${
                item.isRead ? 'text-gray-400' : 'text-gray-600'
              }`}
            >{item.sender}</Text>
          </View>
        </TouchableOpacity>
      {/* </Animated.View> */}
    </Swipeable>
  );

  return (
    <View className="w-full h-full">
      <Image
        source={require('../../assets/images/background.jpg')}
        className="absolute w-full h-full flex-1 bg-cover"
      />
      <View className="flex-1 p-5">
        {/* Header */}
        <View className="relative flex flex-row items-center mt-14 px-3 py-3 justify-between">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-[#2E2E38] p-2 rounded-full"
          >
            <Feather name="arrow-left" size={23} color="#fff" />
          </TouchableOpacity>

          {/* Centered Text */}
          <Text className="text-[26px] font-bold text-[#2E2E38]">
            Notifications
          </Text>

          {/* Three-dot Menu */}
          <TouchableOpacity className="bg-[#2E2E38] p-2 rounded-full">
            <Feather name="more-vertical" size={23} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Clear All Button */}
        <TouchableOpacity
          onPress={clearAllNotifications}
          className="bg-red-500 p-4 rounded-full my-6 mx-auto"
        >
          <Text className="text-white font-bold text-xl text-center">
            Clear All Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
