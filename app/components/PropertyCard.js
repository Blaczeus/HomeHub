import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PropertyCard = ({ imageUri }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUri}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 300,
    borderRadius: 20,
    backgroundColor: 'rgb(46,46,56)',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',  // Ensure it's responsive
    height: '100%',
  },
});


// Usage Example
// <PropertyCard imageUri="https://example.com/path-to-your-image.jpg" />

export default PropertyCard;
