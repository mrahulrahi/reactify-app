import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const icon = require("@/assets/images/action-icon-4.png");
const iconDark = require("@/assets/images/action-icon-4-dark.png");
const icon1 = require("@/assets/images/aspect-icon-1.png");
const icon1Dark = require("@/assets/images/aspect-icon-1-dark.png");
const icon2 = require("@/assets/images/aspect-icon-2.png");
const icon2Dark = require("@/assets/images/aspect-icon-2-dark.png");
const icon3 = require("@/assets/images/aspect-icon-3.png");
const icon3Dark = require("@/assets/images/aspect-icon-3-dark.png");
const icon4 = require("@/assets/images/aspect-icon-4.png");
const icon4Dark = require("@/assets/images/aspect-icon-4-dark.png");

const videoIcon = require("@/assets/images/videocam.png");
const videoIconDark = require("@/assets/images/videocam-dark.png");

const SettingsModal = ({
  isVisible,
  setIsVisible,
  isVideo,
  setIsVideo,
  aspectRatio,
  setAspectRatio,
}) => {
  const aspectRatios = [
    { title: "1:1", icon: icon1, iconDark: icon1Dark },
    { title: "16:9", icon: icon2, iconDark: icon2Dark },
    { title: "2:3", icon: icon3, iconDark: icon3Dark },
    { title: "9:16", icon: icon4, iconDark: icon4Dark },
    { title: "9:21", icon: icon4, iconDark: icon4Dark },
  ];
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {}, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View className="flex-1 justify-end bg-black/80">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
              colors={["rgba(51, 52, 50, 1)", "rgba(0, 0, 0, 1)"]}
              locations={[0, 0.2]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ paddingHorizontal: 20, paddingVertical: 36 }}
              className="py-9 px-5"
            >
              <Text className="font-inter500 text-2xl leading-none text-bs-white mb-6">
                Settings
              </Text>

              <Text className="font-inter500 text-base leading-none text-[#ACACAC] mb-2">
                Generation Type:
              </Text>
              <View className="flex-row justify-around gap-1 bg-[#2e2e2e] rounded-[30px] p-1 mb-6">
                <TouchableOpacity
                  activeOpacity={1}
                  className={`grow flex-row items-center justify-center gap-1.5 py-2.5 px-5 rounded-3xl ${
                    !isVideo ? "bg-bs-white" : null
                  }`}
                  onPress={() => setIsVideo(false)}
                >
                  <Image
                    className="!w-6 !h-6"
                    source={!isVideo ? iconDark : icon}
                    resizeMode="contain"
                  />
                  <Text
                    className={`text-base leading-tight ${
                      !isVideo
                        ? "font-inter700 text-bs-black"
                        : "font-inter400 text-bs-white"
                    }`}
                  >
                    Images
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  className={`grow flex-row items-center justify-center gap-1.5 py-2.5 px-5 rounded-3xl ${
                    isVideo ? "bg-bs-white" : null
                  }`}
                  onPress={() => setIsVideo(true)}
                >
                  <Image
                    className="!w-6 !h-6"
                    source={isVideo ? videoIconDark : videoIcon}
                    resizeMode="contain"
                  />
                  <Text
                    className={`text-base leading-tight ${
                      isVideo
                        ? "font-inter700 text-bs-black"
                        : "font-inter400 text-bs-white"
                    }`}
                  >
                    Videos
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="font-inter500 text-base leading-none text-[#ACACAC] mb-2">
                Aspect Ratio
              </Text>
              <View className="flex-row justify-between bg-[#202020] rounded-[30px] gap-1 p-1 mb-5">
                {aspectRatios.map((ratio) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={ratio.title}
                    className={`max-w-20 flex-row items-center gap-1 grow basis-0 py-2.5 px-3 rounded-3xl ${
                      aspectRatio === ratio.title ? "bg-bs-white" : null
                    }`}
                    onPress={() => setAspectRatio(ratio.title)}
                  >
                    <View className={`h-[18px] grow shrink-0`}>
                      <Image
                        className="!w-full !h-full"
                        source={
                          aspectRatio === ratio.title
                            ? ratio.iconDark
                            : ratio.icon
                        }
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      className={`text-base leading-snug ${
                        aspectRatio === ratio.title
                          ? "font-inter700 text-bs-black"
                          : "font-inter400  text-bs-white"
                      }`}
                    >
                      {ratio.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="font-inter500 text-base leading-none text-[#ACACAC] mb-2">
                Image Quality
              </Text>
              <View className="flex-row justify-between gap-1 bg-[#2e2e2e] rounded-[46px] p-3.5">
                <View className="flex-row items-center justify-center gap-1.5 py-1 px-2 rounded-3xl">
                  <Image
                    className="!w-6 !h-6"
                    source={icon}
                    resizeMode="contain"
                  />
                  <Text className=" font-inter700 text-base leading-tight text-bs-white">
                    High Quality
                  </Text>
                </View>

                <TouchableOpacity
                  className={`w-[62px] h-8 justify-center p-1 bg-bs-black rounded-[36px] ${
                    isEnabled ? "items-end" : "items-start"
                  }`}
                  onPress={() => setIsEnabled(!isEnabled)}
                >
                  <View
                    className={`w-6 h-6 bg-bs-white rounded-full ${
                      isEnabled ? "items-end" : "items-start"
                    }`}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettingsModal;
