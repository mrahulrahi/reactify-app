import { View, Text } from "react-native";
import { Image } from "expo-image";

export default function NoRecordFound({ imageSource, title, subtitle }) {
  return (
    <View  className="pb-[60px] pt-[150px]">
      <View className="w-full max-w-[220px] mx-auto">
        <View className="w-[150px] h-[158px] mx-auto mb-[30px]">
            <Image 
            style={{ width: "100%", height: "100%" }} 
            source={imageSource} 
            contentFit="contain" 
            />
        </View>
        <Text className="text-center font-lexend500 text-[24px] text-rally-white">
            {title}
        </Text>
        <Text className="mt-3 text-center font-lexend300 text-[14px] leading-[1.4] text-rally-white/60">{subtitle}</Text>
      </View>
    </View>
  );
}
