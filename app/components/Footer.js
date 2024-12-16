import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>Powered by Nervego</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#A0AEC0",
  },
});

export default Footer;
