import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import FlatListComponent from "@/components/FlatList";
import { useNavigation } from "expo-router";

const profileImg = require("@/assets/images/profile-img.png");
const galleryImg1 = require("@/assets/images/gallery-img-1.jpg");
const galleryImg2 = require("@/assets/images/gallery-img-2.jpg");
const galleryImg3 = require("@/assets/images/gallery-img-3.jpg");

const DATA = [
  {
    id: "1",
    icon: "icon-1",
    bgImg: "img-1",
    title: "Create a logo",
    para: "Generate unique content with a text prompt.",
  },
  {
    id: "2",
    icon: "icon-2",
    bgImg: "img-2",
    title: "Create a sticker",
    para: "Generate unique content with a text prompt.",
  },
  {
    id: "3",
    icon: "icon-3",
    bgImg: "img-3",
    title: "Create Merch",
    para: "Generate unique content with a text prompt.",
  },
];

const Signup1Screen = () => {
  const navigation = useNavigation();

  const handleItemPress = (title) => {
    if (title === "Create a logo") {
      navigation.navigate("logo/logoTemplate");
    } else if (title === "Create a sticker") {
      navigation.navigate("sticker/logoTemplate");
    } else if (title === "Create Merch") {
      navigation.navigate("merch/logoTemplate");
    }
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 28, paddingBottom: 30 }} className="flex-1 bg-bs-bg-color" edges={["top"]}>
        {/* Screen Main Wrapper */}
        <FlatListComponent data={DATA} onPress={handleItemPress} />

        {/* Screen Bottom Wrapper */}
        <View className="w-full flex-row items-start justify-between pt-[11px]">
          <TouchableOpacity activeOpacity={1} className="w-[50px] h-[50px] relative overflow-hidden">
            <Image className="!w-full !h-full !rounded-full" source={profileImg} resizeMode="cover" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("general/getImageChat")}
            className="max-w-[160px] w-2/5 h-[55px] relative flex items-center justify-center bg-bs-white rounded-[40px]"
          >
            <Entypo className="flex-grow-0" name="plus" size={38} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("general/myCreationsImages")}  className="w-[50px] relative">
            <Image className="!w-11 !h-11 absolute top-[1px] right-[15px] -rotate-[9deg] rounded-lg z-10" source={galleryImg1} resizeMode="cover" />
            <Image className="!w-11 !h-11 absolute top-[1px] right-[9px] -rotate-[4deg] rounded-lg z-20" source={galleryImg2} resizeMode="cover" />
            <Image className="!w-11 !h-11 absolute top-[1px] right-[3px] rotate-[4deg] rounded-lg z-30" source={galleryImg3} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Signup1Screen;
