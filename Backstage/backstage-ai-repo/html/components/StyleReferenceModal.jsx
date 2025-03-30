import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const icon2 = require("@/assets/images/action-icon-2.png");
const icon3 = require("@/assets/images/action-icon-3.png");

const StyleReferenceModal = ({
  isVisible,
  setIsVisible,
  styleCards,
  activeStyleCard,
  setActiveStyleCard,
  setImage,
}) => {
  useEffect(() => {}, [isVisible]);

  const handleOutsideClick = () => {
    setIsVisible(false); // Close the modal when clicking outside
  };

  const handleStyleCardPress = (item) => {
    setActiveStyleCard(item.id);
    setImage(item.img); // Directly set the image object
    handleOutsideClick();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={handleOutsideClick}
    >
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View className="flex-1 justify-end bg-black/80">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
              colors={["rgba(51, 52, 50, 1)", "rgba(0, 0, 0, 1)"]}
              locations={[0, 0.2]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ paddingHorizontal: 16, paddingTop: 11, paddingBottom:34 }}
              className="py-2.5 px-4"
            >
              <View className="flex-row gap-6 items-center justify-between mb-[24px]">
                <Text className="font-inter500 text-2xl leading-none text-bs-white">
                  Select Style
                </Text>

                <View className="flex-row justify-around gap-3">
                  <TouchableOpacity
                    activeOpacity={1}
                    className={`!w-[50px] !h-[50px] items-center justify-center bg-bs-black/50 border rounded-full border-[#606060]`}
                    onPress={() => alert("Style Button 1")}
                  >
                    <Image style={{width:24,height:24}}
                      className="!w-6 !h-6"
                      source={icon2}
                      contentFit="contain"
                      transition={1000}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    className={`!w-[50px] !h-[50px] items-center justify-center bg-bs-black/50 border rounded-full border-[#606060]`}
                    onPress={() => alert("Style Button 2")}
                  >
                    <Image style={{width:24,height:24}}
                      className="!w-6 !h-6"
                      source={icon3}
                      contentFit="contain"
                      transition={1000}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="grow-0 -ms-4"
                style={{ width }}
              >
                <View className="flex-row gap-3 px-4">
                  {styleCards.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      className={`w-[180px] h-[252px] p-2 border rounded-3xl ${
                        activeStyleCard === item.id
                          ? "border-bs-white"
                          : "border-transparent"
                      } bg-bs-white/10`}
                      onPress={() => handleStyleCardPress(item)} // Set active card ID and image
                    >
                      {item.id === 1 ? (
                        <View className="!w-full aspect-[0.8/1] !h-[calc(100%-32px)] items-center justify-center bg-[#0D0D0D] rounded-2xl">
                          <Image style={{width:48,height:48,borderRadius:16,overflow:"hidden"}}
                            className="!w-12 !h-12 rounded-2xl overflow-hidden"
                            source={item.img}
                            contentFit="fill"
                            transition={1000}
                          />
                        </View>
                      ) : (
                        <View className="!w-full aspect-[0.8/1] !h-[calc(100%-32px)] items-center justify-center bg-[#0D0D0D] rounded-2xl">
                          <Image style={{width:'100%',height:'100%',borderRadius:16,overflow:"hidden"}}
                            className="!w-full !h-full rounded-2xl overflow-hidden"
                            source={item.img}
                            contentFit="fill"
                            transition={1000}
                          />
                        </View>
                      )}

                      <Text className="font-inter500 text-base text-bs-white text-center mt-2">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StyleReferenceModal;
