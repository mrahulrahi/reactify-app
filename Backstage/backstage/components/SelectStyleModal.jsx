import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native"; 
import LoadingCard from "@/components/LoadingCard"
import CustomHeader from "@/components/CustomHeader";
import { FontAwesome6 } from "@expo/vector-icons/";

const { width } = Dimensions.get("window");

const icon2 = require("@/assets/images/createLogo/close-icon.png");

const SelectStyleModal = ({
  isVisible,
  setIsVisible,
  styleCards,
  activeStyleCard,
  setActiveStyleCard,
  modalTitle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); 

  useEffect(() => {}, [isVisible]);

  const handleOutsideClick = () => {
    setIsVisible(false); // Close the modal when clicking outside
  };

  const handleStyleCardPress = (item) => {
    setIsLoading(true); // Show loading state
    setTimeout(() => {
      setActiveStyleCard(item.id);
      setIsLoading(false); // Hide loading state
      setIsVisible(false); // Close modal
      navigation.navigate("logo/logoTemplateComplete"); // Navigate after loading
    }, 3000); // 3-second loading time
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={handleOutsideClick}>
      {isLoading ? (
        <SafeAreaView className="flex-1 bg-black">
          <CustomHeader showBackTitle={true} showTitle={false}  />
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
            <LoadingCard aspectRatio="1/1" type="image" description="Applying Tropical image style..." buttonVisibility = 'imageOnly'   />
          </ScrollView>
          <View className="w-full">
            
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={130}
            className="pt-3"
          >
        

            <View className="flex-row h-[74px] items-center bg-bs-bg-color border-[6px] border-b-0 border-[#23292B] rounded-t-[30px] px-4">
              <TextInput
            className="flex-1 font-inter400 text-lg leading-[1.2] text-bs-dark-gray h-[40px] outline-none"
                onChangeText={(text) => {
                  setMessage(text);
                  setSelectedBadge(null);
                }}
                // value="Generating... wait 15 seconds"
                placeholder="Generating... wait 15 seconds"
                placeholderTextColor="#C4C4C4"
                keyboardType="default"
                onFocus={() => {
                  setIsInputFocused(true);
                  setSelectedBadge(null);
                }}
                onBlur={() => setIsInputFocused(true)}
              />
              <TouchableOpacity
                activeOpacity={1}
                className="ml-2 w-12 !h-12 items-center justify-center shrink-0 bg-[#292929] border border-[#292929] rounded-full"
              >
                <FontAwesome6 name="arrow-up" size={28} color="#666666" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

      </SafeAreaView>
  


      ) : (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View className="flex-1 justify-end bg-black/80">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <LinearGradient
                colors={["rgba(51, 52, 50, 1)", "rgba(0, 0, 0, 1)"]}
                locations={[0, 0.2]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ paddingHorizontal: 16, paddingTop: 11, paddingBottom: 34 }}
                className="py-2.5 px-4"
              >
                <View className="flex-row gap-6 items-center justify-between mb-[24px]">
                  <Text className="font-inter500 text-2xl leading-none text-bs-white">
                    {modalTitle}
                  </Text>

                  <View className="flex-row justify-around gap-3">
                    <TouchableOpacity
                      activeOpacity={1}
                      className="w-[50px] h-[50px] items-center justify-center bg-bs-black/50 border rounded-full border-[#606060]"
                      onPress={handleOutsideClick}
                    >
                      <Image style={{ width: 24, height: 24 }} source={icon2} contentFit="contain" />
                    </TouchableOpacity>
                  </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="grow-0 -ms-4" style={{ width }}>
                  <View className="flex-row gap-3 px-4">
                    {styleCards.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.8}
                        className={`w-[180px] h-[252px] p-2 border rounded-3xl ${
                          activeStyleCard === item.id ? "border-bs-white" : "border-transparent"
                        } bg-bs-white/10`}
                        onPress={() => handleStyleCardPress(item)}
                        disabled={isLoading} // Prevent multiple clicks while loading
                      >
                        <View className="w-full aspect-[0.8/1] h-[calc(100%-32px)] items-center justify-center bg-[#0D0D0D] rounded-2xl">
                          <Image
                            style={{ width: "100%", height: "100%", borderRadius: 16 }}
                            source={item.img}
                            contentFit="fill"
                          />
                        </View>
                        <Text className="font-inter500 text-base text-bs-white text-center mt-2">{item.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
};

export default SelectStyleModal;
