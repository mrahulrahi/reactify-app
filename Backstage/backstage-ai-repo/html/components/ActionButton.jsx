import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Image } from "expo-image";

const ActionButton = ({ text, iconName, onPress, isPrimary = false, isBorderWhite = false }) => {
  return (
    <TouchableOpacity activeOpacity={1}
      className={`flex-row items-center px-[18px] py-3 rounded-full border ${
        isPrimary
          ? "bg-white"
          : "bg-black"
      } ${isBorderWhite ? "border-white" : "border-[#4D5658]"}`}
      onPress={onPress}
    >    
      <View className="w-6 h-6 aspect-square">
        <Image
          source={iconName}
          contentFit="cover"
          transition={1000}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text
        className={`ml-2 text-base font-inter700 ${
          isPrimary ? "text-black" : "text-white"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
