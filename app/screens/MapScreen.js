import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function MapScreen({ properties, setSidebarVisible }) {
  const navigation = useNavigation();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedProperties, setSortedProperties] = useState([]);

  const handleMarkerPress = (property) => {
    navigation.navigate("PropertyDetails", { property });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });

        if (properties && properties.length > 0) {
          const sorted = properties.sort((a, b) => {
            const distanceA = calculateDistance(
              latitude,
              longitude,
              a.latitude,
              a.longitude
            );
            const distanceB = calculateDistance(
              latitude,
              longitude,
              b.latitude,
              b.longitude
            );
            return distanceA - distanceB;
          });
          setSortedProperties(sorted);
        }
      } catch (err) {
        console.error("Error getting location:", err);
        setError("Error retrieving location");
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, [properties]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); 
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 6.5244,
          longitude: currentLocation?.longitude || 3.3792,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {/* User location marker */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="You are here"
            pinColor="green"
          >    
          </Marker>
        )}

        {/* Show property markers */}
        {sortedProperties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude || 6.5244,
              longitude: property.longitude || 3.3792,
            }}
            title={property.title}
            description={property.description}
            onPress={() => handleMarkerPress(property)}
            pinColor="red"
          >
            {/* Callout for property details */}
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{property.title}</Text>
                <Text style={styles.calloutType}>{property.type}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Map View</Text>
      </View>

      {/* Sidebar Button */}
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => setSidebarVisible(true)}
      >
        <Feather name="menu" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sidebarButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 2,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  calloutContainer: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calloutType: {
    fontSize: 14,
    color: "gray",
  },
});
