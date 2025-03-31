import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons/";
import GenRatioCard from '@/components/GenRatioCard';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from "@/components/CustomHeader";
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

// Animated value for resizing
const scaleAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
    setIsInputFocused(true);
    Animated.timing(scaleAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
    setIsInputFocused(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  return () => {
    keyboardDidShow.remove();
    keyboardDidHide.remove();
  };
}, []);


  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-black">
      <CustomHeader showBackTitle={true} showTitle={false}  />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isInputFocused ? "flex-end" : "center",
          alignItems: "center",
        }}
      >
        <View className="w-full">
          
          <View
            className={`grow items-center ${
              isInputFocused ? "justify-end" : "justify-center"
            }  `}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <GenRatioCard aspectRatio="1/1" imageSource={modifyImg} />
            </Animated.View>
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
