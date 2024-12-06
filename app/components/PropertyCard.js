import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PropertyCard = ({ property, onPress, isFavorite, onToggleFavorite }) => {
  return (
    <TouchableOpacity
      className="mx-5 my-3 shadow-md rounded-[20] overflow-hidden"
      onPress={onPress}
    >
      {/* Card Gradient Background */}
      <LinearGradient
        colors={['#A0C4B0', '#2E2E38']}
        className="rounded-[20] p-4"
      >
        {/* Image Container */}
        <View className="relative h-56 w-full rounded-[20] overflow-hidden">
          {/* Image */}
          <Image
            source={property.imageUri}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Dark Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 w-full h-[30%]"
          />

          {/* Description Overlay */}
          <Text className="absolute bottom-3 left-3 text-white font-bold text-xl">
            {property.title}
          </Text>
          <Text className="absolute bottom-3 right-3 text-white font-bold text-xl">
            {property.price}
          </Text>

          {/* Favorite Button */}
          <TouchableOpacity 
            className="absolute top-3 right-3"
            onPress={() => onToggleFavorite(property.id)}
          >
            <Icon 
              name="star" 
              size={23} 
              color= {isFavorite? '#FFC336' : '#fff'} />
          </TouchableOpacity>
        </View>

        {/* Details Section */}
        <View className="flex-row justify-between mx-2 mt-6">
          {/* Title and Location */}
          <View className="flex-col justify-between gap-3">
            <View className="flex-row items-center mr-4">
              <Icon name="home" size={24} color="#fff" />
              <Text className="ml-1 text-lg text-white">{property.type}</Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="map-marker" size={20} color="#fff" />
              <Text className="ml-2 text-lg text-white">
                {property.location}
              </Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Icon name="star" size={22} color="#FFC336" />
              <Text className="ml-1 text-xl text-white">{property.rating}</Text>
            </View>
          </View>

           {/* Additional Info */}
          <View className="flex-col justify-between gap-3">
            <View className="flex-row items-center mr-4">
              <Icon name="bed" size={20} color="#fff" />
              <Text className="ml-1 text-sm text-white">
                {property.bedrooms} Beds
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="shower" size={20} color="#fff" />
              <Text className="ml-1 text-sm text-white">
                {property.bathrooms} Baths
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="calendar" size={20} color="#fff" />
              <Text className="ml-1 text-sm text-white">
                {property.status}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PropertyCard;
