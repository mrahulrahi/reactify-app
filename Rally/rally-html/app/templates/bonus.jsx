import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import GradientButton from "../components/GradientButton";

export default function Bonus() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 ">
        <View className="bg-rally-bg-color flex-1">
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
                source={require("../../assets/images/claim-icon.png")}
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
        <View className="pb-[45px] px-[50px]">
          <GradientButton title="Claim" type="blue" onAction="templates/bonus-claimed"/>
        </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
