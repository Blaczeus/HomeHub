import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


export default function HomeScreen({ setIsAuthenticated }) 
{
  const navigation = useNavigation();

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 mt-10">
      {userInfo ? (
        <>
          <View className="mb-5 mt-10 items-center">
            <Text className="text-4xl font-bold">Hello, {userInfo.username}!</Text>
            <Text className="text-2xl mt-6">Here's a quick overview of your activities.</Text>
          </View>
          <TouchableOpacity
                className="bg-white p-4 rounded-lg mb-6 mt-6 h-60 shadow-md"
                // onPress={handleAddTask}
          >
             <View>
              <Text className="text-4xl font-bold mb-6 text-black">Recent Activities</Text>
              <Text className="text-xl font-semibold text-black">- Completed 5 tasks this week</Text>
              <Text className="text-base mt-2 italic text-black">Keep up the great work!</Text>
            </View>
          </TouchableOpacity>

          <View className="mb-5 mt-5">
            <Text className="text-3xl font-semibold mt-8 mb-3">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between">
              <TouchableOpacity
                className="bg-cyan-500 flex-1 min-w-[48%] p-5 mx-1 my-2 rounded-lg items-center drop-shadow-2xl"
                onPress={() => navigation.navigate( 'Add Task' )}
              >
                <Text className="text-white font-semibold text-lg">Add Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-teal-500 flex-1 min-w-[48%] p-5 mx-1 my-2 rounded-lg items-center drop-shadow-2xl"
                onPress={() => navigation.navigate( 'Settings' )}
              >
                <Text className="text-white font-semibold text-lg">View Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-indigo-400 flex-1 min-w-[48%] p-5 mx-1 my-2 rounded-lg items-center drop-shadow-2xl"
                onPress={() => navigation.navigate( 'About' )}
              >
                <Text className="text-white font-semibold text-lg">About Us</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-orange-400 flex-1 min-w-[48%] p-5 mx-1 my-2 rounded-lg items-center drop-shadow-2xl"
                onPress={() => navigation.navigate( 'Notifications' )}
              >
                <Text className="text-white font-semibold text-lg">Notifications</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <Text className="text-3xl font-bold mb-4">Welcome Guest!</Text>
          <Text className="text-lg text-gray-200 mb-8">You have not been successfully authenticated.</Text>
          <TouchableOpacity
            onPress={() => setIsAuthenticated(false)}
            className="flex items-center justify-center px-4 py-2 bg-sky-400 h-14 rounded-2xl"
          >
            <Text className="text-xl font-bold text-center text-white">Go back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
