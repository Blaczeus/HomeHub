import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ActivityIndicator,FlatList, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import MenuItem from "../components/MenuItem";
import PropertyCard from '../components/PropertyCard';
import SidebarOverlay from '../components/SidebarOverlay';
import { FavouritesContext } from "../contexts/FavouritesContext";

export default function HomeScreen({ setIsAuthenticated, properties }) {

  const { favourites, setFavourites } = useContext(FavouritesContext);

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const navigation = useNavigation();

  const toggleFavourite = (propertyId) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.includes(propertyId)
        ? prevFavourites.filter((id) => id !== propertyId)
        : [...prevFavourites, propertyId];
      return updatedFavourites;
    });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const loggedInUser = await SecureStore.getItemAsync("loggedInUser");
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

  const menuItems = ["All", "Apartment", "House", "Office", "Land"];

  const handleFilterClick = (item) => {
    setSelectedFilter(item);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
    navigation.navigate("Notifications");
  };

  const closeNotification = () => {
    setShowNotifications(false);
  };

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

  if (!favourites) {
    console.warn("Favourites is not defined, defaulting to empty array");
    favourites = [];
  }

  return (
    <>
      <Image
        source={require("../../assets/images/background.jpg")}
        className="absolute w-full h-full flex-1 bg-cover"
      />
      {/* <ScrollView className="flex-1 w-full h-full" contentContainerStyle={{ paddingBottom: 100 }}> */}

      <View className="w-full h-full">
        {userInfo ? (
          <>
            <View className="w-full h-full">
              {/* Header */}
              <View className="relative flex flex-row items-center mt-14 px-6 py-3 justify-between">
                {/* Sidebar Button */}
                <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                  <Feather name="menu" size={24} color="#000" />
                </TouchableOpacity>

                {/* Centered Text */}
                <Text className="absolute left-[38%] text-2xl font-bold">
                  Browse Apartments
                </Text>

                <View className="flex-row gap-4">
                  {/* Notifications Icon */}
                  <View className="relative">
                    <TouchableOpacity onPress={handleNotificationClick}>
                      <Feather name="bell" size={24} color="#000" />
                    </TouchableOpacity>
                    {/* Badge Count */}
                    <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                      <Text className="text-white text-xs">3</Text>
                    </View>
                  </View>

                  {/* Favourite Icon */}
                  <View className="relative">
                    <TouchableOpacity>
                      <Feather name="star" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Badge Count */}
                    {favourites.length > 0 && (
                      <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <Text className="text-white text-xs">
                          {favourites.length}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Search Bar */}
              <View className="relative mt-10 px-6 py-3 flex flex-row items-center">
                <SearchBar />
              </View>

              {/* Menu Items */}
              <View className="px-6 mt-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  {menuItems.map((item) => (
                    <View key={item} style={{ marginRight: 10 }}>
                      <TouchableOpacity
                        onPress={() => handleFilterClick(item)}
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 20,
                          backgroundColor:
                            selectedFilter === item ? "#3F85D7" : "transparent",
                          borderRadius: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: selectedFilter === item ? "#fff" : "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View className="relative flex flex-row items-center px-8 py-6 justify-between">
                <Text className="text-xl font-bold text-[#04364A]">
                  {selectedFilter === "All"
                    ? "All Properties"
                    : `${selectedFilter}s`}
                </Text>

                {selectedFilter !== "All" && (
                  <View>
                    <TouchableOpacity className="flex-row gap-2">
                      <Text className="text-lg font-bold text-[#3F85D7]">
                        See All
                      </Text>
                      <Feather name="arrow-right" size={20} color="#3F85D7" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Property Cards */}
              <View className="flex-1 flex-row flex-wrap justify-center items-center mx-3 my-4 w-full">
                <FlatList
                  data={properties.filter(
                    (property) =>
                      selectedFilter === "All" ||
                      property.type === selectedFilter
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <PropertyCard
                      key={item.id}
                      property={item}
                      isFavourite={favourites.includes(item.id)}
                      onToggleFavorite={toggleFavourite}
                      onPress={() =>
                        navigation.navigate("PropertyDetails", {
                          property: item,
                        })
                      }
                    />
                  )}
                  ListEmptyComponent={
                    <Text className="text-center text-lg">
                      No properties found
                    </Text>
                  }
                  contentContainerStyle={{
                    paddingBottom: 100,
                  }}
                />
              </View>
            </View>
            {/* Sidebar Overlay */}
            <SidebarOverlay
              isVisible={isSidebarVisible}
              onClose={() => setSidebarVisible(false)}
            />
          </>
        ) : (
          <>
            <Text className="text-3xl font-bold mb-4">Welcome Guest!</Text>
            <Text className="text-lg text-gray-200 mb-8">
              You have not been successfully authenticated.
            </Text>
            <TouchableOpacity
              onPress={() => setIsAuthenticated(false)}
              className="flex items-center justify-center px-4 py-2 bg-sky-400 h-14 rounded-2xl"
            >
              <Text className="text-xl font-bold text-center text-white">
                Go back
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* </ScrollView> */}

      {/* <SidebarOverlay /> */}
    </>
  );
}
