import React from 'react';
import { View } from 'react-native';
import { Image } from "expo-image";

const GenRatioCard = ({ aspectRatio = "1/1", imageSource }) => {
  
  const aspectStyle = aspectRatio === "1/1"
    ? { aspectRatio: 1 }
    : aspectRatio.includes("/") 
      ? { aspectRatio: eval(aspectRatio) } // Convert "9/16" to 9 / 16
      : { aspectRatio: 1 };

  return (
    <View className="mx-auto w-full rounded-3xl overflow-hidden" style={aspectStyle}>
      <Image
        source={imageSource}  
        contentFit="cover"
        transition={1000}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default GenRatioCard;
