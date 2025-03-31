import { Link } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import GradientButton from "../components/GradientButton";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }} className="flex-col justify-end px-10 py-14 bg-rally-bg-color">
          <View className="flex-row gap-4 items-center mb-[66px]">
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 50, height: 50 }}
              contentFit="contain"
              transition={1000} />
            <Text className="font-lexend500 text-2xl leading-tight text-rally-white uppercase">LOGO</Text>
          </View>
          <View className="mb-14">
            <Text className="font-lexend500 text-[9.1vw] leading-tight text-rally-white uppercase">Sign Up</Text>
            <Text className="font-lexend500 text-[9.1vw] leading-tight text-rally-white uppercase">and Claim</Text>
            <Text className="font-lexend500 text-[9.1vw] leading-tight text-rally-white uppercase">Your Welcome</Text>
            <Text className="font-lexend500 text-[9.1vw] leading-tight text-rally-white uppercase">Offer</Text>
          </View>

          <View className="mb-[35px]"><GradientButton title="Create Account" type="blue" onAction="auth/signup"/></View>
          <View className="flex-row gap-1.5 justify-center">
            <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-[#6C7278]">Already have an account?</Text>
            <Link href='auth/signin'>
              <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">Sign In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
