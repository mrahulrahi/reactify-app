import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const ICONS = {
  Home: {
    active: require("../../assets/images/home-active.png"),
    inactive: require("../../assets/images/home.png"),
  },
  InPlay: {
    active: require("../../assets/images/inplay-active.png"),
    inactive: require("../../assets/images/inplay.png"),
  },
  NBA: {
    active: require("../../assets/images/nba-active.png"),
    inactive: require("../../assets/images/nba.png"),
  },
  NFL: {
    active: require("../../assets/images/nfl-active.png"),
    inactive: require("../../assets/images/nfl.png"),
  },
  MLB: {
    active: require("../../assets/images/mlb-active.png"),
    inactive: require("../../assets/images/mlb.png"),
  },
};

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View className="flex-row bg-[#121418] h-[60px] px-[10px] mb-[10px] items-center justify-between">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => navigation.navigate(route.name);
        // Ensure the route name exists in the ICONS object
        const icon = ICONS[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            className="flex-1 items-center"
          >
            {icon && (
              <>
                <Image
                  source={isFocused ? icon.active : icon.inactive}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain" 
                />
                <Text className={`text-sm mt-1 ${isFocused ? "text-[#1E90FF]" : "text-rally-white"}`}>
                  {route.name}
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
