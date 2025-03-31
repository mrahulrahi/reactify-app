import React, { useRef, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import GradientButton from "../components/GradientButton";
import LottieView from "lottie-react-native";

export default function Bonus() {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 relative">        
        <View className="bg-rally-bg-color flex-1">
          <View className="w-full h-full flex items-center justify-center  absolute left-0 top-0 right-0 bottom-0 z-10">
          <LottieView
            ref={animationRef}
            source={require("../../assets/json/gradientBall.json")}
            resizeMode="cover"
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}  // Adjust the size for the animation
          />

          </View>
          <View className="pt-[100px]">
            <Text className="font-lexend300 text-center text-[14px] leading-[1.4] text-rally-white/60 mb-2.5 uppercase">
              Daily Bonus
            </Text>
            <Text className="font-lexend500 text-[36px] text-rally-white  text-center">
              Welcome Back!
            </Text>
          </View>
          <ScrollView
            className="flex-1 bg-rally-bg-color pt-2.5 pb-10"
            contentContainerStyle={{ justifyContent: "center" }}
          >
            <View className="grow items-center text-center justify-center w-full max-w-[340px] mx-auto">
              <View className="w-[180px] h-[182px] mx-auto -mb-[22px]">
                <Image
                  source={require("../../assets/images/claim-check-icon.png")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="contain"
                />
              </View>
              <Text className="font-Roboto700 text-[48px]  text-center tracking-[-0.02em] text-rally-white mb-[40px]">
                +50
              </Text>
              <Text className="font-lexend300 text-[16px]  text-center leading-[1.4] text-rally-white/60">
                Enjoy a free gift of 50 Rally coins!
              </Text>
              <Text className="font-lexend300 text-[16px]  text-center leading-[1.4] text-rally-white/60">
                Make your sports picks and earn rewards
              </Text>
              <Text className="font-lexend300 text-[16px]  text-center leading-[1.4] text-rally-white/60">
                as you play!
              </Text>
            </View>
          </ScrollView>
          <View className="pb-[45px] px-[50px] relative z-20">
            <GradientButton
              title="Claim"
              type="green"
              onAction="templates/bonus1"
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
