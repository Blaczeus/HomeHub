import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import {properties} from '../../data/properties';


export default function BookmarkScreen({ setIsAuthenticated }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const loggedInUser = await SecureStore.getItemAsync('loggedInUser');
        if (loggedInUser) {
          setUserInfo(JSON.parse(loggedInUser));
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const toggleFavourite = (propertyId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(propertyId)
        ? prevFavourites.filter((id) => id !== propertyId)
        : [...prevFavourites, propertyId]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Please log in to view your favorites.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 w-full h-full">
      <View className="relative flex-1">
        <Image
          source={require('../../assets/images/background.jpg')}
          className="absolute w-full h-full flex-1 bg-cover"
        />

        {/* Header */}
        <View className="relative flex flex-row items-center mt-14 px-6 py-3 justify-between">
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="absolute left-[38%] text-xl font-bold">Bookmarks</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Feather name="star" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="relative mt-10 px-6 py-3 flex flex-row items-center">
          <SearchBar />
        </View>

        {/* Favourites List */}
        <View className="relative flex-row items-center px-8 py-3 justify-between">
          <Text className="text-xl font-bold text-[#04364A]">Your Bookmarked Properties</Text>
        </View>

        {/* Property List */}
        <View className="flex-1 flex-row flex-wrap justify-center items-center m-3">
          <FlatList
            data={properties.filter((property) => favourites.includes(property.id))}
            renderItem={({ item }) => (
              <PropertyCard
                key={item.id}
                property={item}
                isFavourite={true}
                onToggleFavorite={toggleFavourite}
                onPress={() =>
                  navigation.navigate('PropertyDetails', { property: item })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingBottom: 100,
              flexGrow: 1,
            }}
            ListEmptyComponent={<Text className="text-center text-lg">No bookmarks found</Text>}
          />
        </View>
      </View>
    </ScrollView>
  );
}
