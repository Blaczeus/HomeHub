// SidebarOverlay.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Modal, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Icon from 'react-native-vector-icons/FontAwesome';

const SidebarOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;  // Don't render if the sidebar is not visible

  return (
    <View style={styles.overlay}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.menuItems}>
        <Text style={styles.menuItem}>Profile</Text>
        <Text style={styles.menuItem}>Settings</Text>
        <Text style={styles.menuItem}>Logout</Text>
        {/* Add more items as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
    zIndex: 999,
    paddingTop: 50,
    paddingLeft: 20,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
});


export default SidebarOverlay;
