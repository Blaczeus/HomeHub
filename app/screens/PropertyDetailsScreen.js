import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PropertyDetailsScreen({ route }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  
  const { property } = route.params;
  const navigation = useNavigation();

  const toggleFavourite = (propertyId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(propertyId)
        ? prevFavourites.filter((id) => id !== propertyId)
        : [...prevFavourites, propertyId]
    );
  };

  const handleCall = (contactNumber) => {
    Linking.openURL(`tel:${contactNumber}`); // Replace with actual number
  };

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
  
        <View className="relative">
          <Image source={require('../../assets/images/background.jpg')} className="absolute w-full bg-cover" />
          <View>
            {/* Image Container with Rounded Bottom */}
            <View className="h-4/4 w-full">
              <Image source={property.imageUri} style={{ borderRadius: 28 }}  className="w-full" resizeMode="cover" />
              
              {/* Favorite Button */}
              <TouchableOpacity 
                className="absolute bottom-3 right-3 bg-[rgba(46, 46, 56, 0.5)] p-2 rounded-full"
                onPress={() => toggleFavourite(property.id)}
              >
                <Icon name="star" size={20} color={favourites.includes(property.id) ? "#FFC336" : "#FFFFFF"} />
              </TouchableOpacity>

              {/* Dots Indicator */}
              <View className="absolute bottom-3 left-0 right-0 flex-row justify-center">
                <View className="w-2 h-2 mx-1 bg-gray-400 rounded-full" />
                <View className="w-2 h-2 mx-1 bg-gray-800 rounded-full" />
                <View className="w-2 h-2 mx-1 bg-gray-400 rounded-full" />
              </View>
            </View>

            {/* Header */}
                <View className="absolute flex flex-row items-center mt-14 p-6 justify-between w-full">

                  {/* Back Button */}
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-[rgba(217,217,217,0.6)] p-2 rounded-full"
                  >
                    <Feather name="arrow-left" size={23} color="#2E2E38" />
                  </TouchableOpacity>

                  {/* Centered Text */}
                  <Text className="text-2xl bg-[#D9D9D9] px-3 py-2 rounded-full text-center font-bold text-[#2E2E38]">
                    Property Details
                  </Text>

                  {/* Three-dot Menu */}
                  <TouchableOpacity className="bg-[rgba(217,217,217,0.6)] p-2 rounded-full">
                    <Feather name="share-2" size={23} color="#2E2E38" />
                  </TouchableOpacity>
                </View>
          </View>


          <View className="mx-5 mt-7">

            {/* Property Details Container */}
            <View className="flex p-4 bg-white rounded-3xl">
              <View className="flex-row justify-between items-center mb-2">
                <View style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)' }}  className="px-5 py-2 rounded-full">
                  <Text className="text-lg font-bold text-[#3F85D7]">
                    {property.type}
                  </Text>
                </View>
                <View className="flex-row">
                  <Icon name="star" size={20} color="#FFC336" />
                  <Text className="">{property.rating}</Text>
                  <Text className="ml-2">({property.reviewsCount}  reviews)</Text>
                </View>
              </View>
              <View className="flex-col justify-between items-center self-start mb-2">
                <Text className="text-4xl font-bold">{property.title}</Text>
                <View className="flex-row items-center">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(211, 47, 47, 0.4)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="map-marker" size={20} color="rgba(241, 19, 19, 1)" />
                  </View>
                  <Text className="text-3x1 text-gray-500">{property.location}</Text>
                </View>
              </View>

              <View className="flex-row justify-between mt-4">
                <View className="flex-row items-center">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="home" size={30} color="#3F85D7" />
                  </View>
                  <View className="flex-col">
                    <Text className="ml-2 text-xl font-extrabold text-gray-800">{property.type}</Text>
                    <Text className=" ml-2 text-lg font-semibold text-gray-500">Type</Text>
                  </View>         
                </View>
                <View className="flex-row items-center">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="home" size={30} color="#3F85D7" />
                  </View>
                  <View className="flex-col">
                    <Text className="ml-2 text-xl font-extrabold text-gray-800">{property.price}</Text>
                    <Text className=" ml-2 text-lg font-semibold text-gray-500">Estimated Cost</Text>
                  </View>         
                </View>
              </View>

              <View className="flex-row justify-between mt-7 mb-8">
                <View className="flex-row items-center">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="bed" size={30} color="#3F85D7" />
                  </View>
                  <View className="flex-col">
                    <Text className="ml-2 text-xl font-extrabold text-gray-800">{property.bedrooms}</Text>
                    <Text className=" ml-2 text-lg font-semibold text-gray-500">Bedrooms</Text>
                  </View>         
                </View>
                <View className="flex-row items-center">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="shower" size={30} color="#3F85D7" />
                  </View>
                  <View className="flex-col">
                    <Text className="ml-2 text-xl font-extrabold text-gray-800">{property.bathrooms}</Text>
                    <Text className=" ml-2 text-lg font-semibold text-gray-500">Bathrooms        </Text>
                  </View>         
                </View>
              </View>
            </View>

            {/* Agent Info */}
            <View className="mt-7 p-4 flex-row justify-between items-center bg-white rounded-3xl shadow-md">
              <View className="flex-row items-center">
                <Image source={property.agent.imageUri} style={{ width: 60, height: 60, borderRadius: 25 }} />
                <View className="flex-col">
                  <Text className="ml-2 text-xl font-extrabold text-gray-800">{property.agent.name}</Text>
                  <Text className=" ml-2 text-lg font-semibold text-gray-500">Agent</Text>
                </View>
              </View>
              <View className="flex-row">
                <TouchableOpacity className="ml-4">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="phone" size={30} color="#3F85D7" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="ml-4">
                  <View  className="items-start" style={{ backgroundColor: 'rgba(63, 133, 215, 0.3)', borderRadius: 20, marginRight: 8, padding: 5 }}>
                    <Icon name="email" size={30} color="#3F85D7" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Contact Button */}
            <TouchableOpacity onPress={() => handleCall(property.agent.contactNumber)} style={{ backgroundColor: 'rgba(63, 133, 215, 1)', width: '80%', alignSelf: 'center', }}  className="mt-7 rounded-full p-4 mb-4 items-center">
              <Text className="text-white font-bold text-3xl">Contact Agent</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}
