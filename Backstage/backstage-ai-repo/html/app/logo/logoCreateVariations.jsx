import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FontAwesome6 } from "@expo/vector-icons/";
import CustomHeader from "@/components/CustomHeader";

const width = Dimensions.get('window').width;
console.log(width)
const modifyImg = require("@/assets/images/modify.jpg");

const Modify = () => {
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false]);

  const imageSources = [
    require('@/assets/images/createLogo/multi-img-1.jpg'),
    require('@/assets/images/createLogo/multi-img-2.jpg'),
    require('@/assets/images/createLogo/multi-img-3.jpg'),
    require('@/assets/images/createLogo/multi-img-4.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return 0; // Reset to 0 when it reaches 100 to start the loop over
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeouts = imagesLoaded.map((_, index) =>
      setTimeout(() => {
        setImagesLoaded((prev) => {
          const newImagesLoaded = [...prev];
          newImagesLoaded[index] = true;
          return newImagesLoaded;
        });
      }, 2500 * (index + 1))
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-black">
        <CustomHeader showBackTitle={true} showTitle={false}  />
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
            <View className="grow-0 bg-[#0F0F0F] p-2.5 border border-[#4D5658] rounded-[30px] w-full">
              <View
                className="!w-full grow-0 relative rounded-[26px] overflow-hidden aspect-square"
              >
                <View className="flex-row flex-wrap flex-1 gap-2.5">
                  {imagesLoaded.map((loaded, index) => (
                    <View key={index} style={{ flexGrow: 1, width: width / 2 - 32, aspectRatio: 1, position: 'relative' }} >
                      {loaded ? (
                        <Image
                          source={imageSources[index]}
                          style={{ width: '100%', height: '100%', opacity: 1, border: '1px solid #363636', borderRadius: 25, overflow: 'hidden' }}
                          contentFit="cover"
                          transition={1000}
                        />
                      ) : (
                        <Image
                          source={require('@/assets/images/gen.gif')}
                          style={{ width: '100%', height: '100%', opacity: 0.5, borderRadius: 25, overflow: 'hidden' }}
                          contentFit="cover"
                          transition={1000}
                        />
                      )}

                      {!loaded &&
                        <View className="flex-1 absolute top-1/2 -translate-y-1/2 items-center justify-center gap-5 self-center">
                          <AnimatedCircularProgress
                            size={57}
                            width={4}
                            fill={progress}
                            tintColor="#ffffff"
                            backgroundColor="#4A5568"
                          />
                          <Text className="font-inter400 text-base leading-none text-bs-silver-sand">{message}</Text>
                        </View>}

                    </View>
                  ))}
                </View>
              </View>
              <Text className="font-inter400 px-3 pt-5 pb-2 text-[17.4px] leading-[1.15] text-bs-silver-sand">
                {imagesLoaded.every(Boolean) ? 'Select an image to make modifications.' : 'Generating Image Variations...'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={130}
        className="pt-3"
      >
        {isInputFocused && selectedBadge === null && (
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
                  className={`px-2.5 py-2 h-[38px] mr-[10px] min-w-[95px] text-center items-center justify-center rounded-full border  ${selectedBadge === badge
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
            className={`flex-1 font-inter400 text-lg leading-[1.2] text-bs-dark-gray h-[40px] ${isInputFocused ? 'outline-none' : 'outline-none'}`}
            onChangeText={(text) => {
              setMessage(text);
              setSelectedBadge(null);
            }}
            value={message}
            placeholder="What would you like to change?"
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
    </SafeAreaView>
  );
};

export default Modify;
