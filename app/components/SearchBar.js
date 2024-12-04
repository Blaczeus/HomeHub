import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({query, onQueryChange}) => {
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = async () => {
    if (!searchTerm.trim() || searching) return;
    setSearching(true);

    console.log("Searching for:", searchTerm);
    if (onQueryChange) onQueryChange(searchTerm);

    setTimeout(() => {
      setSearching(false);
    }, 2000);
  };

  return (
    <View className="flex-row items-center justify-between h-16 w-full">
      {/* Search Box */}
      <View className="flex-row items-center bg-[#FCFCFC] rounded-lg shadow-md px-4 py-2 flex-1 w-full h-16">
        {/* Search Icon */}
        <Feather name="search" size={23} color="#2E2E38" className="mr-2" />

        {/* Search Input */}
        <TextInput
          placeholder="| Search..."
          placeholderTextColor="#828282"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            if (onQueryChange) onQueryChange(text);
          }}
          onSubmitEditing={handleSearch}
          className="flex-1 text-black"
        />

      </View>

      {/* Spacer */}
      <View className="w-4" />

      {/* Filter Button */}
      <TouchableOpacity
        onPress={handleSearch}
        disabled={searching}
        className={`flex-row w-1/4 h-16 items-center rounded-lg px-4 py-2 ${
          searching ? "bg-[#2E2E38]" : "bg-[#2E2E38]"}`
        }
      >
        {/* Filter Icon */}
        <Image
          source={require("../../assets/images/filter.png")}
          className="w-8 h-8 mr-2"
        />
        {/* Filters Text */}
        <Text className="text-white text-sm">{searching ? "Searching" : "Filter"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
