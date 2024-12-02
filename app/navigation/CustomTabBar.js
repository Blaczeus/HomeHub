import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function CustomTabBar({ state, descriptors, navigation }) {
  const tabOffsetValue = useSharedValue(0);

  const getWidth = () => {
    let width = Dimensions.get("window").width - 40;
    return width / state.routes.length;
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const isAddTask = state.routes[state.index].name === " Add Task";

    return {
      transform: [{ translateX: tabOffsetValue.value }],
      backgroundColor: isAddTask ? "white" : "red",
    };
  });

  return (
    <View
      className="flex-row absolute bottom-10 mx-5 bg-white w-[90%] h-16 rounded-lg shadow-md shadow-gray-400 justify-between items-center px-5 left-1"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);

            // Animate the tab indicator
            tabOffsetValue.value = withTiming(getWidth() * index, { duration: 300 });
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
          >
            <View className="flex items-center">
              {route.name === "Add Task" ? (
                <View
                  className={`${
                    isFocused ? 'bg-cyan-500' : 'bg-black'
                  } w-14 h-14 rounded-full flex items-center justify-center mb-10`}
                >
                  <Image
                    source={require("../../assets/images/plus.png")}
                    className="w-6 h-6"
                    style={{ tintColor: 'white'}}
                  />
                </View>
              ) : (
                <FontAwesome5
                  name={options.tabBarIcon}
                  size={22}
                  color={isFocused ? "black" : "gray"}
                />
              )}
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}
