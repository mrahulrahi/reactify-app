import React from 'react';
import { View } from 'react-native';
import { Image } from "expo-image";

const GenRatioLogoCard = ({ aspectRatio = "1/1", logoSource }) => {
  
  const aspectStyle = aspectRatio === "1/1"
    ? { aspectRatio: 1 }
    : aspectRatio.includes("/") 
      ? { aspectRatio: eval(aspectRatio) } // Convert "9/16" to 9 / 16
      : { aspectRatio: 1 };

  return (
    <View className="mx-auto w-full rounded-3xl overflow-hidden border border-[#363636]" style={aspectStyle}>
      <Image
        source={logoSource} 
        contentFit="contain"
        transition={1000}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default GenRatioLogoCard;
