import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/images/Logos/lightlogo-small.png")}
        style={styles.logo}
      />
      {/* <Text style={styles.title}>HomeHub</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A5568",
  },
});

export default Logo;
