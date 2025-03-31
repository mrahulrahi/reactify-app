import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import GradientButton from "../components/GradientButton";
import { Link } from "expo-router";

export default function OtpVerification() {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} className="bg-rally-bg-color">
                <View className="flex-col justify-center flex-1 px-10">

                    <View className="flex-col items-center">
                        <View className="mb-6">
                            <Image
                                source={require("../../assets/images/password-success-icon.png")}
                                style={{ width: 123, height: 123 }}
                                contentFit="contain"
                                transition={1000} />
                        </View>

                        <View className="max-w-[328px] mb-[54px]">
                            <Text className="font-lexend600 text-[32px] leading-[1.3] tracking-[-0.02em] text-rally-white text-center">Password Changed Successfully</Text>
                            <Text className="font-lexend300 text-base leading-normal tracking-[-0.01em] text-rally-white/70 mt-3 text-center">Your password has been updated.</Text>
                            <Text className="font-lexend300 text-base leading-normal tracking-[-0.01em] text-rally-white/70 text-center">You can now use your new password to log in to your account.</Text>
                        </View>

                        <View className="w-full max-w-[238px]">
                            <GradientButton title="Sign In" type="blue" onAction="tabs/dashboard" />
                            <Link href='tabs/dashboard' className="mt-5 mx-auto">
                                <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">DashBoard</Text>
                            </Link>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
