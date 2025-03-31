import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { SafeAreaView as SafeAreaContext } from "react-native-safe-area-context";
import InputBar from "@/components/InputBar";

// Image and Video Icons
const icon1 = require("@/assets/images/action-icon-4.png");
const icon1Dark = require("@/assets/images/action-icon-4-dark.png");
const icon2 = require("@/assets/images/videocam.png");
const icon2Dark = require("@/assets/images/videocam-dark.png");

const ChatEmpty = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("image");
  

  return (
    <SafeAreaContext style={{ flex: 1 }} className="bg-bs-bg-color">
      {/* Header */}

      <View className="h-20 p-4 flex-row items-center justify-between border-0">
        <TouchableOpacity
          activeOpacity={1}
          className="!w-[30px] !h-[30px] items-center justify-center flex-shrink-0"
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="chevron-left" size={26} color="white" />
        </TouchableOpacity>
        <View className="flex-row gap-2 bg-[#23292B] border border-[#4D5658] rounded-[46px] overflow-hidden">
          {/* Image Toggle */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab("image")}
            className={`flex-row items-center gap-2 px-4 py-2.5 ${
              activeTab === "image"
                ? "bg-bs-white rounded-[46px]"
                : "bg-transparent"
            }`}
          >
            <Image
              className="!w-6 !h-6"
              source={activeTab === "image" ? icon1Dark : icon1}
              resizeMode="contain"
            />
            <Text
              className={`font-inter700 text-base ${
                activeTab === "image" ? "text-bs-black" : "text-[#979797]"
              }`}
            >
              Image
            </Text>
          </TouchableOpacity>

          {/* Video Toggle */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab("video")}
            className={`flex-row items-center gap-2 px-4 py-2.5 ${
              activeTab === "video"
                ? "bg-bs-white rounded-[46px]"
                : "bg-transparent"
            }`}
          >
            <Image
              className="!w-6 !h-6"
              source={activeTab === "video" ? icon2Dark : icon2}
              resizeMode="contain"
            />
            <Text
              className={`font-inter700 text-base ${
                activeTab === "video" ? "text-bs-black" : "text-[#979797]"
              }`}
            >
              Video
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="!w-[30px] !h-[30px] items-center justify-center flex-shrink-0"
          onPress={() => alert("Help")}
        >
          <Octicons name="question" size={26} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end"}} className="pb-5">        
        <View className="w-full" style={{ paddingHorizontal: 16 }}>
          <Text className="text-white text-[30px] leading-[37px] font-poppins400">
            Enter a prompt to create your masterpiece.
          </Text>
        </View>
      </ScrollView>
      <InputBar activeTab={activeTab}/>
    </SafeAreaContext>
  );
};

export default ChatEmpty;
