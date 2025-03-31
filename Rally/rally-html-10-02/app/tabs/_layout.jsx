import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Tabs
      className="font-lexend300"
      screenOptions={{
        tabBarActiveTintColor: "#1E90FF",
        headerShown: false,
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#0B0C0E",
          borderTopWidth: 0,
          height: 77,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 10,
        },
        tabBarBadgeStyle: {
          color: "#fff",
          backgroundColor: "#1E90FF",
        },
      }}
    >
      <Tabs.Screen
        name="my-picks"
        options={{
          title: "My Picks",
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dribbble" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
