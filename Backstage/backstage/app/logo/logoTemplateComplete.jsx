import React, { useState, useEffect, useRef } from "react";
import {SafeAreaView,ScrollView,View,Text,TextInput,Keyboard,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,TouchableOpacity,Modal,Easing,Animated,} from "react-native";
import ActionButton from "@/components/ActionButton";
import { useNavigation } from "expo-router";
import GenRatioLogoCard from "@/components/GenRatioLogoCard";
import SelectStyleModal from "@/components/SelectStyleModal";
import { FontAwesome6 } from "@expo/vector-icons/";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const images = {
  1: require("@/assets/images/createLogo/logo-templates-img-1.jpg"),
  2: require("@/assets/images/createLogo/logo-templates-img-2.jpg"),
  3: require("@/assets/images/createLogo/logo-templates-img-3.jpg"),
  4: require("@/assets/images/createLogo/logo-templates-img-4.jpg"),
  5: require("@/assets/images/createLogo/logo-templates-img-5.jpg"),
  6: require("@/assets/images/createLogo/logo-templates-img-6.jpg"),
  7: require("@/assets/images/createLogo/logo-templates-img-7.jpg"),
  8: require("@/assets/images/createLogo/logo-templates-img-8.jpg"),
  9: require("@/assets/images/createLogo/logo-templates-img-9.jpg"),
};

const styleImg1 = require("@/assets/images/createLogo/style-img-1.jpg");
const styleImg2 = require("@/assets/images/createLogo/style-img-2.jpg");
const styleImg3 = require("@/assets/images/createLogo/style-img-3.jpg");

const aspectImg1 = require("@/assets/images/createLogo/aspect-img-1.jpg");
const aspectImg2 = require("@/assets/images/createLogo/aspect-img-2.jpg");
const aspectImg3 = require("@/assets/images/createLogo/aspect-img-3.jpg");
const aspectImg4 = require("@/assets/images/createLogo/aspect-img-4.jpg");
const aspectImg5 = require("@/assets/images/createLogo/aspect-img-5.jpg");
const aspectImg6 = require("@/assets/images/createLogo/aspect-img-6.jpg");

const styleCards = [
  { id: 1, img: styleImg1, title: "Tropical" },
  { id: 2, img: styleImg2, title: "Neon Wave" },
  { id: 3, img: styleImg3, title: "Style Image" },
];

const aspectCards = [
  { id: 1, img: aspectImg1, title: "Square" },
  { id: 2, img: aspectImg2, title: "Landscape" },
  { id: 3, img: aspectImg3, title: "Mobile / Reels" },
  { id: 4, img: aspectImg4, title: "Photograph" },
  { id: 5, img: aspectImg5, title: "Portrait" },
  { id: 6, img: aspectImg6, title: "Wide Banner" },
];

// const modifyImg = require("@/assets/images/createLogo/modify-img.jpg");
const pletteIcon = require("@/assets/images/plette-icon.png");
const resizeIcon = require("@/assets/images/resize-icon.png");
const createVariationIcon = require("@/assets/images/createLogo/create-variation-icon.png");
const reloadIcon = require("@/assets/images/reload-icon.png");

const GenerationComplete = () => {
  const route = useRoute(); // Get the logo ID from navigation
  const navigation = useNavigation();
  // const { id } = route.params; // Extract logo ID

  const [isStyleModalVisible, setIsStyleModalVisible] = useState(false);
  const [isAspectModalVisible, setIsAspectModalVisible] = useState(false);
  const [activeStyleCard, setActiveStyleCard] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [focusedIcon, setFocusedIcon] = useState("");

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

  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(350)).current;

  useEffect(() => {
    if (modalVisible) {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
  
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(sizeAnim, {
          toValue: 280,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(sizeAnim, {
          toValue: 330,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(() => setModalVisible(false), 50);
      });
    }
  
    const showListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardOpen(true)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOpen(false)
    );
  
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [modalVisible]);
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black">
        <View className="h-20 p-4 flex-row justify-between border-0">
          {/* Close Icon */}
          <TouchableOpacity
            activeOpacity={1}
            className="flex-row gap-1.5 items-center"
            onPress={() => navigation.navigate("auth/signup")}
          >
            <View className="!w-6 !h-6 items-center justify-center flex-shrink-0">
              <Image
                style={{ width: 24, height: 24 }}
                className="!w-full !h-full bg-red-100"
                source={require("@/assets/images/close.png")}
                contentFit="contain"
                transition={1000}
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
                  style={{ width: 28, height: 28 }}
                  className="!w-full !h-full"
                  source={require("@/assets/images/undo.png")}
                  contentFit="contain"
                  transition={1000}
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
                  style={{ width: 28, height: 28 }}
                  className="!w-full !h-full"
                  source={require("@/assets/images/redo.png")}
                  contentFit="contain"
                  transition={1000}
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

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="w-full">
            <View className="grow justify-center">
              <View>
                <GenRatioLogoCard aspectRatio="1/1" logoSource={styleImg1} />
              </View>
            </View>
            {/* Action Buttons */}

            <ScrollView className="grow-0 mt-4" horizontal>
              <View className="flex-row justify-center items-center gap-2.5  px-4">
                <ActionButton
                  text="Apply Style"
                  iconName={pletteIcon}
                  onPress={() => setIsStyleModalVisible(true)}
                  isPrimary={true}
                />
                <ActionButton
                  text="Resize"
                  iconName={resizeIcon}
                  onPress={() => setIsAspectModalVisible(true)}
                />
                <ActionButton
                  text="Create Variations"
                  iconName={createVariationIcon}
                  onPress={() =>
                    navigation.navigate("logo/logoCreateVariations")
                  }
                />
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Bottom Input Bar */}
        <View className="w-full">
          <View className="flex-row justify-center items-center pb-4">
            <ActionButton
              text="Try Again"
              iconName={reloadIcon}
              isBorderWhite={true}
              // onPress={() => navigation.navigate("create-logo/loading")}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={1}
            className="flex-row h-[74px] items-center bg-bs-bg-color border-[6px] border-b-0 border-[#23292B] rounded-t-[30px] px-4"
          >
            <View className="grow">
              <Text className="text-[#C4C4C4] text-lg leading-[1.2]">
                What would you like to change?
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              className="w-12 h-12 ml-2 items-center justify-center bg-[#292929] border border-[#292929] rounded-full"
            >
              <FontAwesome6 name="arrow-up" size={28} color="#666666" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="bg-black"
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={insets.top + 60}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback>
              <Animated.ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: "white",
                  paddingTop: insets.top,
                }}
                keyboardShouldPersistTaps="always"
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: insets.top,
                    backgroundColor: "#000",
                    zIndex: 1,
                  }}
                />
                <View
                  className="bg-black"
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Close Button */}

                  <View className="w-full h-[30] pl-4  flex-row items-center justify-between">
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      activeOpacity={1}
                      className=" items-center flex-row gap-3 justify-center flex-shrink-0"
                    >
                      <FontAwesome6
                        name="chevron-left"
                        size={20}
                        color="white"
                      />
                      <Text
                        style={{ color: "white", marginLeft: 5, fontSize: 16 }}
                      >
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Center Box */}
                  <Animated.View className="w-full grow flex items-center justify-center">
                    <Animated.View
                      style={{
                        width: sizeAnim,
                        height: sizeAnim,
                        borderRadius: 24,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={require("@/assets/images/createLogo/logo-templates-img-2.jpg")}
                        contentFit="cover"
                      />
                    </Animated.View>
                  </Animated.View>

                  {/* Input Field */}
                  <View className="w-full">
                    <Animated.ScrollView
                      contentContainerStyle={{ flexGrow: 1 }}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="flex-row space-x-2 mb-3 pl-3"
                      keyboardShouldPersistTaps="handled" 
                    >
                      {suggestionBadges.map((badge, index) => (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={() => handleBadgePress(badge)}
                        >
                          <View
                            className={`px-2.5 py-2 h-[38px] mr-[10px] min-w-[95px] text-center items-center justify-center rounded-full border ${
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
                    </Animated.ScrollView>
                    <View className="flex-row h-[74px] items-center bg-bs-bg-color border-[6px] border-b-0 border-[#23292B] rounded-t-[30px] px-4">
                      <TextInput
                        className="flex-1 font-inter400 text-lg leading-[1.2] text-bs-dark-gray h-[40px] outline-none"
                        ref={inputRef}
                        placeholder="What would you like to change?"
                        placeholderTextColor="#C4C4C4"
                        keyboardType="default"
                        onChangeText={(text) => {
                          setMessage(text);
                          setSelectedBadge(null);
                        }}
                        value={message}
                        onFocus={() => setIsInputFocused(true)}
                      />
                      <TouchableOpacity
                        activeOpacity={1}
                        className="ml-2 w-12 h-12 items-center justify-center shrink-0 bg-[#292929] border border-[#292929] rounded-full"
                      >
                        <FontAwesome6
                          name="arrow-up"
                          size={28}
                          color="#666666"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Animated.ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {isStyleModalVisible && (
        <SelectStyleModal
          isVisible={isStyleModalVisible}
          setIsVisible={setIsStyleModalVisible}
          styleCards={styleCards}
          activeStyleCard={activeStyleCard}
          setActiveStyleCard={setActiveStyleCard}
          modalTitle="Select Style"
        />
      )}

      {isAspectModalVisible && (
        <SelectStyleModal
          isVisible={isAspectModalVisible}
          setIsVisible={setIsAspectModalVisible}
          styleCards={aspectCards}
          activeStyleCard={activeStyleCard}
          setActiveStyleCard={setActiveStyleCard}
          modalTitle="Aspect Ratio"
        />
      )}
    </SafeAreaView>
  );
};

export default GenerationComplete;
