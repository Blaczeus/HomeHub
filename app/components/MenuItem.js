import React from "react";
import { TouchableOpacity, Text } from "react-native";

const MenuItem = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-1/4 h-12 rounded-xl items-center justify-center ${
        isSelected ? "bg-[#3e84d6] shadow-md" : "bg-transparent"
      }`}
    >
      <Text
        className={`font-semibold ${
          isSelected
            ? "text-white text-xl"
            : "text-[#04364A] text-lg"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
