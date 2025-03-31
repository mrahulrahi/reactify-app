import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./home";
import InPlayScreen from "./inplay";
import NBAScreen from "./nba";
import NFLScreen from "./nfl";
import MLBScreen from "./mlb";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";

const Tab = createMaterialTopTabNavigator();
export default function DashboardLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="bg-rally-bg-color" style={{ flex: 1 }}>
          <View className=" pt-5 px-5 pb-[12px]">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl text-white font-lexend400 -tracking-[0.02em]">
                Dashboard
              </Text>
              <LinearGradient
                colors={["#FFD700", "#FF8C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 2, borderRadius: 60 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    paddingLeft: 8,
                    paddingRight: 12,
                    paddingVertical: 6,
                    borderRadius: 50,
                    gap: 24,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/coin.png")}
                    style={{ width: 24, height: 24, marginRight: 6 }}
                    contentFit="contain"
                    transition={1000}
                  />
                  <Text className="text-white text-base font-Roboto800">
                    1208
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
          <Tab.Navigator
            className="font-Roboto400"
            screenOptions={{
              tabBarIndicatorStyle: { display: "none" },
              tabBarActiveTintColor: "#1E90FF",
              tabBarInactiveTintColor: "#fff",
              tabBarStyle: {
                backgroundColor: "#121418",
                border: 0,
                height: 65,
                marginBottom: 20,
                padding: 0,
                margin: 0,
                flexFlow: "row",
                justifyContent: "space-between",
              },
              tabBarLabelStyle: {
                fontSize: 13,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="InPlay"
              component={InPlayScreen}
              options={{
                title: "InPlay",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="live-tv" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="NBA"
              component={NBAScreen}
              options={{
                title: "NBA",
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="dribbble" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="NFL"
              component={NFLScreen}
              options={{
                title: "NFL",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5
                    name="football-ball"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="MLB"
              component={MLBScreen}
              options={{
                title: "MLB",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="baseball-sharp" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
