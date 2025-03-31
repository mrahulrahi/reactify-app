import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import ActiveScreen from "./active";
import SettledScreen from "./settled";
import { Image } from "expo-image";
import CustomTabBar from "../../components/CustomTabsBar";

const Tab = createMaterialTopTabNavigator();
export default function DashboardLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="bg-rally-bg-color" style={{ flex: 1 }}>
          <View className=" pt-5 px-5 pb-[12px] mb-[25px]">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl text-white font-lexend400 -tracking-[0.02em]">
                My Picks
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
          <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen name="Active" component={ActiveScreen} />
            <Tab.Screen name="Settled" component={SettledScreen} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
