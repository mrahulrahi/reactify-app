import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Platform,
} from "react-native";
import Button from "./Button";
import ImagePickerBox from "./ImagePicker";
import SettingsModal from "./SettingsModal";
import { useNavigation } from "expo-router";

// Icons for Image and Video modes
const imageRefIcon = require("@/assets/images/image-reference.png");
const styleRefIcon = require("@/assets/images/palette.png");
const startKeyframeIcon = require("@/assets/images/image-reference.png");
const endKeyframeIcon = require("@/assets/images/image-reference.png");

const InputBar = ({ activeTab, onImagePress, onActionPress, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [focusedPicker, setFocusedPicker] = useState(null);

  const navigation = useNavigation();

  const referenceLabel = activeTab === "image" ? "Image Reference" : "Start Keyframe";
  const styleLabel = activeTab === "image" ? "Style Reference" : "End Keyframe";
  const referenceIcon = activeTab === "image" ? imageRefIcon : startKeyframeIcon;
  const styleIcon = activeTab === "image" ? styleRefIcon : endKeyframeIcon;

  const handlePress = () => {
    setIsSettingsModalVisible(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setShowStyleModal(false);
  };

  const handleGalleryPress = () => {
    setShowReferences((prevState) => !prevState); // Toggle visibility
    if (onImagePress) {
      onImagePress(); // Call the onImagePress function if it's defined
    } else {
      console.warn("onImagePress function is not defined!");
    }
  };

  const handleActionPress = () => {
    setShowReferences(false); // Close references when any other button is pressed
    if (onActionPress) {
      onActionPress(); // Call the onActionPress function if it's defined
    }
  };

 

  return (
    <>
      <KeyboardAvoidingView 
        className="pt-3 pb-4"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 

      >
        <View
          className="px-4 py-2.5 "
        >
          <View
            className={`w-full bg-[#23292B] border ${
              isFocused || showReferences
                ? "border-[#4D5658] border-[0.97px] py-[9px] px-2.5 bg-[#23292B] rounded-[30px]"
                : "px-2.5 py-2 border-[#4D5658] rounded-[41px]"
            }`}
          >
            {/* Row for Image Reference and Style Reference */}
            {showReferences && (
              <View className="w-full flex-row gap-2.5 mt-1 mb-2 mx-1">
                <ImagePickerBox
                  title={referenceLabel}
                  icon={referenceIcon}
                  modalType="gallery"
                  setFocusedPicker={setFocusedPicker}
                  focusedPicker={focusedPicker}
                />
                <ImagePickerBox
                  title={styleLabel}
                  icon={styleIcon}
                  modalType="style"
                  setFocusedPicker={setFocusedPicker}
                  focusedPicker={focusedPicker}
                />
              </View>
            )}

            {/* Input Container */}
            <View
              className={`w-full ${
                isFocused
                  ? "bg-[#0E0F11] rounded-[23px] flex-col-reverse"
                  : "flex-row"
              }`}
            >
              <View className={`flex-row ${isFocused ? "w-full p-[9px]" : ""}`}>
                <View className="flex-row">
                  {/* Gallery Button */}
                  <Button
                    onPress={handleGalleryPress}
                    iconSource={require("@/assets/images/action-icon-1.png")}
                    focusedIconSource={require("@/assets/images/gallery-icon.png")}
                  />
                  <Button
                    onPress={handleActionPress}
                    iconSource={require("@/assets/images/action-icon-2.png")}
                    focusedIconSource={require("@/assets/images/action-icon-2.png")}
                  />
                  {isFocused && (
                    <Button
                      onPress={handlePress}
                      iconSource={require("@/assets/images/setting-icon-white.png")}
                      focusedIconSource={require("@/assets/images/setting-icon.png")}
                    />
                  )}
                </View>
                {isFocused && (
                  <TouchableOpacity
                    activeOpacity={1}
                    className="w-12 h-12 justify-center items-center ml-auto bg-[#4D5658] rounded-full border-[0.97px] border-[#4D5658]"
                    onPress={() => navigation.navigate("general/ImageGeneration")}
                  >
                    <Image
                      source={require("@/assets/images/chevron-up-icon.png")}
                      className="!w-7 !h-7 tint-white"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                className={`text-white text-base leading-[1.15] px-4 py-4 ${
                  isFocused
                    ? "h-auto min-h-[100px] max-h-[120px] text-lg pt-6 text-[15px] font-inter400 w-full rounded-[23px]"
                    : "h-[48px] text-left grow rounded-[46px] bg-black/50"
                }`}
                placeholder={placeholder || "Type prompt or message"}
                placeholderTextColor={isFocused ? "#c4c4c4" : "#979797"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline={isFocused}
                numberOfLines={isFocused ? 4 : 1}
                textAlignVertical={isFocused ? "top" : "center"}
              />
            </View>

            {/* Modals */}
            {showImageModal && (
              <ImageReferenceModal
                isVisible={showImageModal}
                onClose={handleCloseModal}
              />
            )}
            {showStyleModal && (
              <StyleReferenceModal
                isVisible={showStyleModal}
                onClose={handleCloseModal}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {isSettingsModalVisible && (
        <SettingsModal
          isVisible={isSettingsModalVisible}
          setIsVisible={setIsSettingsModalVisible}
          isVideo={isVideo}
          setIsVideo={setIsVideo}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
      )}
    </>
  );
};

export default InputBar;
