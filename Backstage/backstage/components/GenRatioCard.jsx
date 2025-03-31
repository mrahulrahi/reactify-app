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
    <View className="mx-auto w-full bg-orange-800 rounded-3xl overflow-hidden min-h-[350px] !max-w-[90vw]   max-h-[50vh]  h-auto" style={aspectStyle}>
      <Image
        source={imageSource}  
        contentFit="cover"
        style={{ width: "100%", height: "100%", borderRadius:20, overflow:'hidden' }}
      />
    </View>
  );
};

export default GenRatioCard;
