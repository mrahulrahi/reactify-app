import { useNavigation, Link } from "expo-router";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import GradientButton from "../components/GradientButton";
import BackHeader from "../components/BackHeader";
import { useState, useRef } from "react";
import { z } from "zod";

// Define validation schema using Zod
const validationSchema = z.string()
    .length(5, "OTP must be 5 digits")
    .regex(/^[0-9]+$/, "Invalid OTP");

export default function OtpVerification() {
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    // Handle OTP input changes
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Check if all fields are filled
    const formFilled = otp.every((digit) => digit !== "");

    const navigation = useNavigation();
    // Handle form submission
    const onSubmit = () => {
        const otpString = otp.join("");
        const result = validationSchema.safeParse(otpString);

        if (!result.success) {
            Alert.alert("Error", result.error.errors[0].message);
            return;
        }

        Alert.alert("Success", "OTP Verified Successfully");
        navigation.navigate("auth/password-success");
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} className="bg-rally-bg-color">
                <View className="flex-col justify-between flex-1">
                    <View className="shrink-0 px-10 py-[30px]"><BackHeader /></View>

                    <ScrollView className="grow px-10">
                        <View className="mb-8">
                            <Text className="font-lexend600 text-[32px] leading-[1.3] tracking-[-0.02em] text-rally-white">Verification</Text>
                            <Text className="font-lexend400 text-base leading-[1.4] tracking-[-0.01em] text-rally-white mt-3">Your verification code has been sent. Please check your email and enter the code below to proceed.</Text>
                        </View>

                        <View>
                            <View className="mb-[45px]">
                                <Text className="font-lexend400 text-base leading-[1.6] tracking-[-0.02em] text-rally-white mb-2">Enter Verification Code</Text>
                                <View className="flex-row gap-2.5">
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(el) => inputRefs.current[index] = el}
                                            inputMode="numeric"
                                            keyboardType="numeric"
                                            maxLength={1}
                                            className="w-1/5 aspect-square grow basis-0 items-center p-3.5 font-lexend600 text-xl leading-none text-rally-white text-center bg-rally-white/10 rounded-[10px] outline-none focus:outline-none border-transparent"
                                            placeholder=""
                                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                            onChangeText={(value) => handleOtpChange(index, value)}
                                            value={digit}
                                        />
                                    ))}
                                </View>
                            </View>

                            <View className="flex-row justify-center">
                                <Link href=''>
                                    <Text className="font-lexend400 text-base leading-[1.35] text-rally-blue underline">Click here to resend verification code</Text>
                                </Link>
                            </View>
                        </View>
                    </ScrollView>

                    <View className="shrink-0 px-10 pt-[30px] pb-14">
                        <View className="mb-[35px]">
                            <GradientButton title="Verify" type="blue" onAction={onSubmit} disabled={!formFilled} />
                        </View>
                        <View className="flex-row gap-1.5 justify-center">
                            <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-[#6C7278]">Don’t have an account?</Text>
                            <Link href='auth/signup'>
                                <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">Sign Up</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
