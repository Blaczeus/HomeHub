import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { Easing, SlideInLeft, SlideOutLeft, SlideOutRight, useSharedValue, withTiming } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const TaskItem = ({ item, index, handleEditTask, handleDeleteTask }) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
    }, []);

    return (
        <Animated.View
            className="flex flex-row justify-between items-center mb-4 bg-gray-300 p-4 rounded-lg"
            style={{ opacity }}
            entering={SlideInLeft.duration(500)}
            exiting={SlideOutLeft.duration(1000)}
        >
            <Text className="text-black text-lg">{item}</Text>
            <View className="flex flex-row">
                <TouchableOpacity className="mr-10" onPress={() => handleEditTask(index)}>
                    <FontAwesome5 name="pen" size={18} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <FontAwesome5 name="trash" size={18} color="red" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default TaskItem;
