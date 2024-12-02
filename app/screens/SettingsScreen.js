import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ setIsAuthenticated }) {
  const [darkMode, setDarkMode] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const loggedInUser = await SecureStore.getItemAsync('loggedInUser');
        if (loggedInUser) {
          setUserInfo(JSON.parse(loggedInUser));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('loggedInUser');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-5 mt-14">
      <Text className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Settings</Text>
      {/* User Info */}
      {userInfo && (
        <View className="bg-white rounded-lg shadow p-5 mb-5">
          <Text className="text-2xl font-semibold text-gray-800 mb-2">{userInfo.username || 'User'}</Text>
          <Text className="text-2xl text-gray-600">{userInfo.email}</Text>
        </View>
      )}

      {/* Dark Mode */}
      <View className="bg-white rounded-lg shadow p-5 mb-5 flex-row justify-between items-center">
        <Text className="text-lg font-bold text-gray-800">Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode((prev) => !prev)}
          thumbColor={darkMode ? '#007bff' : '#ddd'}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity className="bg-blue-500 rounded-lg py-3 shadow mb-5">
        <Text className="text-center text-white text-lg font-semibold">Change Password</Text>
      </TouchableOpacity>

      {/* Log Out */}
      <TouchableOpacity
        className="bg-red-500 rounded-lg py-3 shadow"
        onPress={handleLogout}
      >
        <Text className="text-center text-white text-lg font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
