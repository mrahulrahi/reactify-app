import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";

const Button = ({ onPress, iconSource, focusedIconSource, style }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    setIsFocused((prev) => !prev); // Toggle the focused state
    if (onPress) onPress(); // Execute the button's onPress function
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      className="justify-center items-center mr-2.5"
      style={style}
    >
      <View
        className="w-12 h-12 rounded-full justify-center items-center"
        style={{
          backgroundColor: isFocused ? "white" : "rgba(0, 0, 0, 0.5)", 
          borderColor: isFocused ? "white" : "#606060",
          borderWidth: 0.97,
        }}
      >
        <Image
          source={isFocused ? focusedIconSource : iconSource} 
          className="!w-6 !h-6"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default Button;
