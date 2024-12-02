import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomTabBar from "./CustomTabBar";
import NotificationsScreen from "../screens/NotificationScreen";

const Tab = createBottomTabNavigator();

export default function AuthenticatedTabs({ setIsAuthenticated, userInfo }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ tabBarIcon: "info-circle" }}
      />
      <Tab.Screen
        name="Add Task"
        component={AddTaskScreen}
        options={{ tabBarIcon: "plus" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarIcon: "bell" }}
      />
      <Tab.Screen
        name="Settings"
        options={{ tabBarIcon: "cog" }}
      >
        {() => <SettingsScreen setIsAuthenticated={setIsAuthenticated} userInfo={userInfo} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
