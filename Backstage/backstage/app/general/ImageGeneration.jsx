import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LoadingCard from "@/components/LoadingCard";
import InputBar from "@/components/InputBar";
import ActionButton from "@/components/ActionButton";
import GenRatioCard from "@/components/GenRatioCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const modifyImg = require("@/assets/images/modify.jpg");
const pletteIcon = require("@/assets/images/plette-icon.png");
const resizeIcon = require("@/assets/images/resize-icon.png");
const editIcon = require("@/assets/images/edit-icon.png");
const reloadIcon = require("@/assets/images/reload-icon.png");

const ImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedImage, setGeneratedImage] = useState(null);
  const navigation = useNavigation();
  const [focusedIcon, setFocusedIcon] = useState("");

  useEffect(() => {
    // Simulating the generation process (replace this with real API call if needed)
    setTimeout(() => {
      setGeneratedImage("https://your-image-url.com/generated-image.png");
      setIsGenerating(false);
    }, 3000); // Simulated delay
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} className="bg-black">
        {isGenerating ? (
          <>
            <View className="bg-black h-20 p-4 flex-row items-center justify-between border-0">
              <TouchableOpacity
                activeOpacity={1}
                className="flex-row gap-1.5 items-center"
                onPress={() => navigation.goBack()}
              >
                <View className="!w-[30px] !h-[30px] items-center justify-center flex-shrink-0">
                  <FontAwesome6 name="chevron-left" size={26} color="white" />
                </View>
                <Text className="font-poppins400 text-lg text-bs-white">
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <View className="p-4 flex-1 w-screen h-screen  overflow-hidden flex items-center justify-center">
              <LoadingCard
                aspectRatio="1/1"
                type="image"
                buttonVisibility="imageOnly"
              />
            </View>
            <InputBar />
          </>
        ) : (
          <>
            <View className="bg-black h-20 p-4 flex-row items-center justify-between border-0">
              {/* Close Icon */}
              <TouchableOpacity
                activeOpacity={1}
                className="flex-row gap-1.5 items-center"
                onPress={() => navigation.navigate("general/getImageChat")}
              >
                <View className="!w-6 !h-6 items-center justify-center flex-shrink-0">
                  <Image
                    className="!w-full !h-full"
                    source={require("@/assets/images/close.png")}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* Undo and Redo Icons */}
              <View className="flex-row gap-6">
                {/* Undo Icon */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedIcon("undo")}
                  className={`flex-row gap-1.5 items-center ${
                    focusedIcon === "undo" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <View className="!w-[28px] !h-[28px] items-center justify-center flex-shrink-0">
                    <Image
                      className="!w-full !h-full"
                      source={require("@/assets/images/undo.png")}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>

                {/* Redo Icon */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setFocusedIcon("redo")}
                  className={`flex-row gap-1.5 items-center ${
                    focusedIcon === "redo" ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <View className="!w-[28px] !h-[28px] items-center justify-center flex-shrink-0">
                    <Image
                      className="!w-full !h-full"
                      source={require("@/assets/images/redo.png")}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Share Text */}
              <TouchableOpacity
                activeOpacity={1}
                className="flex-row gap-1.5 items-center"
              >
                <View className="items-center justify-center flex-shrink-0">
                  <Text className="font-poppins500 text-[16px] text-blue uppercase">
                    SHARE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="w-full flex-1 pb-[24px]">
              <View className="p-4 flex-1 w-screen  overflow-hidden flex items-center justify-center">
                <GenRatioCard aspectRatio="1/1" imageSource={modifyImg} />
              </View>
              {/* Action Buttons */}
              <View className="flex-row justify-center items-center gap-2.5 mt-4">
                <ActionButton
                  text="Apply Style"
                  iconName={pletteIcon}
                  // onPress={() => navigation.navigate("loading")}
                  isPrimary={true}
                />
                <ActionButton
                  text="Resize"
                  iconName={resizeIcon}
                  onPress={() => alert("Resize Pressed")}
                />
                <ActionButton
                  text="Edit"
                  iconName={editIcon}
                  onPress={() => navigation.navigate("general/modify")}
                />
              </View>
            </View>
            

            {/* Bottom Input Bar */}
            <View>
              <View className="flex-row justify-center items-center  pt-2">
                <ActionButton
                  text="Try Again"
                  iconName={reloadIcon}
                  isBorderWhite={true}
                  onPress={() => alert("Try Again Pressed")}
                />
              </View>
              <View className="w-full">
                <InputBar />
              </View>
            </View>
            
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default ImageGeneration;
