import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons/";
import GenRatioCard from '@/components/GenRatioCard';
import { useNavigation } from '@react-navigation/native';

const modifyImg = require("@/assets/images/modify.jpg");

const Modify = () => {
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation();
  const suggestionBadges = [
    "Add ...",
    "Change Color...",
    "Replace...",
    "Change...",
  ];

  const handleBadgePress = (badgeText) => {
    setSelectedBadge(badgeText);
    setMessage(badgeText);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-black">
      <View className="bg-black h-20 p-4 flex-row items-center justify-between border-0">
          <TouchableOpacity activeOpacity={1} className="flex-row gap-1.5 items-center" onPress={() => navigation.goBack()}>
              <View className="!w-[30px] !h-[30px] items-center justify-center flex-shrink-0"><FontAwesome6 name="chevron-left" size={26} color="white" /></View>
              <Text className="font-poppins400 text-lg text-bs-white">Back</Text>
          </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex-1"
      >
        <View className="w-full">
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16, alignItems: "center", justifyContent: "center" }}>
            <GenRatioCard aspectRatio="1/1" imageSource={modifyImg} />
          </View>
        </View>

      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        className="pt-3"
      >
        {!isInputFocused && (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-2 mb-3 pl-3"
          >
            {suggestionBadges.map((badge, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleBadgePress(badge)}
              >
                <View
                  className={`px-2.5 py-2 h-[38px] mr-[10px] min-w-[95px] text-center items-center justify-center rounded-full border  ${
                    selectedBadge === badge
                      ? "bg-[#353535] border-bs-white"
                      : "bg-bs-bg-color border-border-color"
                  }`}
                >
                  <Text className="font-inter500 text-sm leading-none text-bs-white">
                    {badge}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        )}

        <View className="flex-row h-[74px] items-center bg-bs-bg-color border-[6px] border-b-0 border-[#23292B] rounded-t-[30px] px-4">
          <TextInput
            className="flex-1 font-inter400 text-lg leading-[1.2] text-bs-dark-gray h-[40px]"
            onChangeText={setMessage}
            value={message}
            placeholder="What would you like to change?"
            placeholderTextColor="#C4C4C4"
            keyboardType="default"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <TouchableOpacity
            activeOpacity={1}
            className="ml-2 w-12 !h-12 items-center justify-center shrink-0 bg-[#292929] border border-[#292929] rounded-full"
          >
            <FontAwesome6 name="arrow-up" size={28} color="#666666" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Modify;
