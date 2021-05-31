/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ServeScreen from "../screens/ServeScreen";
import RequireScreen from "../screens/RequireScreen";
import PublishScreen from "../screens/PublishScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import AboutScreen from "../screens/AboutScreen";
import SpaceScreen from "../screens/SpaceScreen";
import {
  BottomTabParamList,
  ServeParamList,
  RequireParamList,
  AboutParamList,
  PublishParamList,
  ChatParamList,
  AccountParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Require"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Require"
        component={RequireNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-rocket-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Serve"
        component={ServeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-grid-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Publish"
        component={PublishNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-add-circle" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-chatbubbles-outline" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-person-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const RequireStack = createStackNavigator<RequireParamList>();

function RequireNavigator() {
  return (
    <RequireStack.Navigator initialRouteName="Space">
      <RequireStack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{ headerTitle: "Category" }}
      />
      <RequireStack.Screen
        name="Space"
        component={SpaceScreen}
        options={{ headerTitle: "Space" }}
      />
    </RequireStack.Navigator>
  );
}

const ServeStack = createStackNavigator<ServeParamList>();

function ServeNavigator() {
  return (
    <ServeStack.Navigator>
      <ServeStack.Screen
        name="ServeScreen"
        component={ServeScreen}
        options={{ headerTitle: "Serve" }}
      />
    </ServeStack.Navigator>
  );
}

const PublishStack = createStackNavigator<PublishParamList>();

function PublishNavigator() {
  return (
    <PublishStack.Navigator>
      <PublishStack.Screen
        name="PublishScreen"
        component={PublishScreen}
        options={{ headerTitle: "Publish" }}
      />
    </PublishStack.Navigator>
  );
}

const AboutStack = createStackNavigator<AboutParamList>();

function AboutNavigator() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: "About" }}
      />
    </AboutStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: "Chat" }}
      />
    </ChatStack.Navigator>
  );
}

const AccountStack = createStackNavigator<AccountParamList>();

function AccountNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerTitle: "Account" }}
      />
    </AccountStack.Navigator>
  );
}
