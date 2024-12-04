import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ActivityIndicator, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import MenuItem from "../components/MenuItem";
import NotificationsScreen from '../screens/NotificationScreen';
import PropertyCard from '../components/PropertyCard';

export default function HomeScreen({ setIsAuthenticated }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Apartment");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const navigation = useNavigation();

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

  const menuItems = ["Apartment", "House", "Office", "Land"];


  const handleFilterClick = (item) => {
    setSelectedFilter(item);
    setSearchQuery(item);
  };

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const closeNotification = () => {
    setShowNotificationModal(false);
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

  return (
    <View className="">
      <Image source={require('../../assets/images/background.jpg')} className="absolute w-full h-full flex-1 bg-cover" />
      {userInfo ? (
        <>
          <View className="w-full h-full">
            {/* Header */}
            <View className="relative flex flex-row items-center mt-14 px-6 py-3 justify-between">
              {/* Sidebar Button */}
              <TouchableOpacity>
                <Feather name="menu" size={24} color="#000" />
              </TouchableOpacity>

              {/* Centered Text */}
              <Text className="absolute left-[38%] text-xl font-bold">
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
                  <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    <Text className="text-white text-xs">7</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Search Bar */}
            <View className="relative mt-10 px-6 py-3 flex flex-row items-center">
              <SearchBar query={searchQuery} onQueryChange={(newQuery) => setSearchQuery(newQuery)} />
            </View>

            {/* Menu Items */}
            <View className="p-6 flex flex-row w-full items-center justify-center relative">
              {menuItems.map((item) => (
                <MenuItem
                  key={item}
                  label={item}
                  isSelected={selectedFilter === item}
                  onPress={() => handleFilterClick(item)}
                />
              ))}
            </View>

            <View className="relative flex flex-row items-center px-8 py-3 justify-between">
              <Text className="text-xl font-bold text-[#04364A]">{selectedFilter}s</Text>

              <View className="">
                <TouchableOpacity className="flex-row gap-2">
                  <Text className="text-lg font-bold text-[#3F85D7]">See All</Text>
                  <Feather name="arrow-right" size={20} color="#3F85D7" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row flex-wrap justify-center items-center mt-10">
            <PropertyCard imageUri={require('../../assets/images/properties/property1.jpg')} />
          </View>

           {/* Notifications Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showNotificationModal}
            onRequestClose={closeNotification}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <NotificationsScreen closeModal={closeNotification} />
                <TouchableOpacity onPress={closeNotification} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3f85d7',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
