import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import FlatListComponent from "@/components/FlatList";
import ActionButton from "@/components/ActionButton";
import { useRouter } from "expo-router";

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

  const router = useRouter();
  const handleItemPress = (title) => {
    if (title === "Create a logo") {
      router.push("logo/logoTemplate");
    } else if (title === "Create a sticker") {
      router.push("sticker/logoTemplate")
    } else if (title === "Create Merch") {
      router.push("merch/logoTemplate");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}} className="flex-1" edges={["top"]}>
        <View className="bg-bs-bg-color flex-1 px-5 pt-[28px] pb-[30px]">
          <View className="flex-row items-center justify-between mb-7">
            <Image
              source={require("@/assets/images/backstage-text-logo.png")}
              resizeMode="contain"
              transition={1000}
              style={{ width: 157, height: 46 }}
            />
            <ActionButton iconName={require("@/assets/images/icon-1.png")} text="Upgrade" isBorderWhite={true} />
          </View>
          {/* Screen Main Wrapper */}
          <FlatListComponent data={DATA} onPress={handleItemPress} />
          {/* Screen Bottom Wrapper */}
          <View className="w-full flex-row items-start justify-between pt-[11px]">
            <TouchableOpacity activeOpacity={1} className="w-[50px] h-[50px] relative overflow-hidden">
              <Image className="!w-full !h-full !rounded-full" source={profileImg} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}            
              onPress={() => router.push("general/getImageChat")}
              className="max-w-[160px] w-2/5 h-[55px] relative flex items-center justify-center bg-bs-white rounded-[40px]"
            >
              <Entypo className="flex-grow-0" name="plus" size={38} color="black" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} 
            onPress={() => router.push("general/myCreationsImages")}
            className="w-[50px] relative">
              <Image className="!w-11 !h-11 absolute top-[1px] right-[15px] -rotate-[9deg] rounded-lg z-10" source={galleryImg1} resizeMode="cover" />
              <Image className="!w-11 !h-11 absolute top-[1px] right-[9px] -rotate-[4deg] rounded-lg z-20" source={galleryImg2} resizeMode="cover" />
              <Image className="!w-11 !h-11 absolute top-[1px] right-[3px] rotate-[4deg] rounded-lg z-30" source={galleryImg3} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Signup1Screen;
