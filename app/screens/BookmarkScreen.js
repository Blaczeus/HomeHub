import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

export default function BookmarkScreen() {
  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-gray-100 p-5 mt-14">
      {/* Header Section */}
      <Text className="text-4xl mt-9 mb-10 font-bold text-gray-800">About This App</Text>
      
      {/* Description Section */}
      <View className="bg-white p-5 rounded-lg shadow-md mb-5">
        <Text className="font-bold text-black mb-2 text-2xl">Description</Text>
      <Text className="text-xl text-black mb-6">
        This app helps users manage tasks and stay productive. Built with React Native and Tailwind CSS, it delivers a sleek and user-friendly experience.
      </Text>
      </View>
      
      {/* Developer Section */}
      <View className="bg-cyan-500 p-5 rounded-lg shadow-md mb-5">
        <TouchableOpacity onPress={() => handleOpenLink('https://github.com/Blaczeus')}>
        <Text className="font-bold text-white mb-2 text-2xl">Developer</Text>
        <Text className=" text-white mb-3 text-xl">Anya Chidiebere Joshua</Text>
          <Text className="text-white font-extrabold text-xl underline">Visit My GitHub</Text>
        </TouchableOpacity>
      </View>
      
      {/* Version Section */}
      <View className="bg-green-600 p-5 rounded-lg shadow-md mb-5">
        <Text className="font-bold text-white mb-2 text-2xl">Version</Text>
        <Text className="font-bold text-white mb-2 text-xl">1.0.0</Text>
      </View>
      
      {/* Privacy Policy Section */}
      <View className="bg-orange-400 p-5 rounded-lg shadow-md">
        <TouchableOpacity onPress={() => handleOpenLink('https://example.com/privacy')}>
        <Text className="font-bold text-white mb-2 text-2xl">Privacy Policy</Text>
          <Text className="font-bold text-white mb-2 text-xl underline">Read Our Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
