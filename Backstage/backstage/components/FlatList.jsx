import React, { useState } from "react";
import { View, FlatList, Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

const images = {
  "img-1": require("@/assets/images/flat-list-img-1.jpg"),
  "img-2": require("@/assets/images/img-2.jpg"),
  "img-3": require("@/assets/images/img-3.jpg"),
  "icon-1": require("@/assets/images/icon-1.png"),
  "icon-2": require("@/assets/images/icon-2.png"),
  "icon-3": require("@/assets/images/icon-3.png"),
};

// const renderHeader = () => (
//   <View>
//     <Text className="text-[44px] leading-[51px] font-poppins600 text-bs-white mb-[24px] px-3">
//       What will you create today?
//     </Text>
//   </View>
// );

const Item = ({ id, title, icon, bgImg, para, isSelected, onPress }) => (
  <TouchableOpacity onPress={() => onPress(title)} activeOpacity={0.9}>
    <Animated.View
      entering={FadeInUp.delay(100 * parseInt(id)).duration(500)}
      className={`w-full relative !h-[184px] flex border-2 rounded-[30px] overflow-hidden mb-4 ${
        isSelected ? "border-white" : "border-[#3E3E3E]"
      }`}
    >
      <ImageBackground className="!w-full !h-full" style={{ width: "100%", height: "100%" }} source={images[bgImg]} resizeMode="cover">
        <LinearGradient
          style={{ flex: 1, paddingHorizontal: 14, paddingVertical: 14 }}
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]}
          locations={[0, 0.56, 0.985]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          className="w-full h-[184px]"
        >
          <View className="flex flex-row items-center gap-2 mb-1">
            <Image className="!w-[35px] !h-[35px]" source={images[icon]} resizeMode="contain" />
            <Text className="font-poppins600 text-[28px] leading-[42px] text-bs-white">{title}</Text>
          </View>
          <Text className="max-w-[216px] font-inter500 text-[14px] leading-[17px] text-bs-light-gray pl-1">
            {para}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  </TouchableOpacity>
);

const FlatListComponent = ({ data, onPress }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handlePress = (title) => {
    setSelectedId(title);
    onPress(title); // Call the passed onPress function
  };

  return (
    <FlatList
      data={data}
      // ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Item {...item} isSelected={selectedId === item.id} onPress={handlePress} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default FlatListComponent;
