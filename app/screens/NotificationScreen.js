import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function NotificationsScreen() {
  const notifications = [
    { id: '1', title: 'New Feature Added!', message: 'Check out the new dark mode option in settings.', isRead: true },
    { id: '2', title: 'Task Reminder', message: 'Don’t forget to complete your pending tasks.', isRead: true },
    { id: '3', title: 'Welcome!', message: 'Thanks for joining the app. Let’s stay productive!', isRead: false },
  ];

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      className={`flex-1 w-full p-5 my-2 rounded-lg drop-shadow-2xl ${
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
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-5 mt-14">
      {/* Header Section */}
      <Text className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Notifications</Text>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
