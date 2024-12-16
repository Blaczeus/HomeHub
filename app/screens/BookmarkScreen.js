import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { FavouritesContext } from "../contexts/FavouritesContext";

export default function BookmarkScreen({ properties }) {

  const { favourites, setFavourites } = React.useContext(FavouritesContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <>
      <Image source={require('../../assets/images/background.jpg')} className="absolute w-full h-full flex-1 bg-cover" />
      <View className="flex-1 w-full h-full">
        {/* Header */}
        <View className="relative flex flex-row items-center mt-14 px-6 py-3 justify-between">
          {/* Sidebar Button */}
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#000" />
          </TouchableOpacity>

          {/* Centered Text */}
          <Text className="text-2xl font-bold">
            Favourites
          </Text>

          <View className="flex-row gap-4">
            {/* Favourite Icon */}
            <View className="relative">
              <TouchableOpacity>
                <Feather name="star" size={24} color="#000" />
              </TouchableOpacity>

              {/* Badge Count */}
              {favourites.length > 0 && (
                <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                  <Text className="text-white text-xs">{favourites.length}</Text>
                </View>
              )}
            </View>
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
        <View className="flex-1 flex-wrap flex-row justify-center items-center mx-3 my-4 w-full">
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
            }}
            ListEmptyComponent={<Text className="text-center text-lg">No bookmarks found</Text>}
          />
        </View>
      </View>
    </>
  );
}
