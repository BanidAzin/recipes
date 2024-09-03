import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ChatScreen } from "./features/chat";
import { DummyScreen } from "./features/dummyTab";

const Tab = createBottomTabNavigator();

export const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "rgb(40, 40, 40)",
          },
          headerTintColor: "white",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "chat") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
            } else if (route.name === "dummy") {
              iconName = focused ? "list" : "list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "rgb(40, 40, 40)",
          },
        })}
      >
        <Tab.Screen
          name="chat"
          component={ChatScreen}
          options={{
            title: "Recipes",
          }}
        />
        <Tab.Screen
          name="dummy"
          component={DummyScreen}
          options={{
            title: "Dummy",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
