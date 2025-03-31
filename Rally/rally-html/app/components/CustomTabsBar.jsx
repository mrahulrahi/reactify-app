import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View className="flex-row bg-[#121418] h-[40px] px-[15px] mb-[20px]">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => navigation.navigate(route.name);
        return (
          <TouchableOpacity
          activeOpacity={1}
            key={route.key}
            onPress={onPress}
            className={`flex-1 items-center justify-center rounded-[60px] py-[10px] mx-[5px] ${
              isFocused ? "bg-rally-blue" : "bg-transparent"
            }`}
          >
            <Text className="text-[14px] font-lexend400 text-rally-white">
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
