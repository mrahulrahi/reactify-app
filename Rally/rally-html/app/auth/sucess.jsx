import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import GradientButton from "../components/GradientButton";

export default function OtpVerification() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View className="flex-col justify-center flex-1 px-10 bg-rally-bg-color">

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

                        <View className="w-full max-w-[238px] gap-2">
                            <GradientButton title="Sign In" type="blue" onAction="tabs/dashboard" />

                            <GradientButton title="Summary" type="blue" onAction="templates/summary" />

                            <GradientButton title="Game Lines" type="blue" onAction="templates/game-lines" />

                            <GradientButton title="Accordion" type="blue" onAction="templates/accordion" />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
