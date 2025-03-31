import { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import GradientButton from "../components/GradientButton";
import BackHeader from "../components/BackHeader";
import Octicons from "@expo/vector-icons/Octicons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema using Zod
const validationSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z
    .string()
    .min(8, "Incorrect password")
    .regex(/[a-zA-Z]/, "Incorrect password")
    .regex(/[0-9]/, "Incorrect password"),
});

export default function Signin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initialize form handling with react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  const formValues = watch(); // Get current form values

  // Check if all required form fields are filled
  const formFilled = () => {
    return formValues.email && formValues.password;
  };

  // Handle form submission
  const onSubmit = (data) => {
    Alert.alert("Success", "Account Signin Successfully");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-col justify-between flex-1 bg-rally-bg-color">
          {/* Back button header */}
          <View className="shrink-0 px-10 py-[30px]">
            <BackHeader />
          </View>

          {/* Form ScrollView */}
          <ScrollView className="grow px-10">
            <View className="mb-8">
              <Text className="font-lexend600 text-[32px] leading-[1.3] tracking-[-0.02em] text-rally-white">
                Sign In
              </Text>
            </View>

            <View>
              {/* Email Input */}
              <View className="mb-[22px]">
                <Text className="font-lexend300 text-sm leading-[1.4] text-rally-white mb-0.5">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextInput
                      inputMode="email"
                      keyboardType="email-address"
                      className={`h-[46px] p-3.5 font-lexend300 text-sm leading-none text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
                        errors.email
                          ? "border border-[#F23C3C]"
                          : "border-transparent"
                      }`}
                      placeholder="Enter Email"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="font-lexend300 text-xs leading-[1.2] text-[#F23C3C] mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Password Input with Toggle Visibility */}
              <View className="mb-[18px]">
                <Text className="font-lexend300 text-sm leading-[1.4] text-rally-white mb-0.5">
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <View className="flex-row items-center relative">
                      <TextInput
                        secureTextEntry={!passwordVisible}
                        className={`flex-1 p-3.5 pe-10 font-lexend300 text-sm leading-[1.4] text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
                          errors.password
                            ? "border border-[#F23C3C]"
                            : "border-transparent"
                        }`}
                        placeholder="Enter Password"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        onChangeText={field.onChange}
                        value={field.value}
                      />
                      {/* Eye Icon to Toggle Password Visibility */}
                      <TouchableOpacity
                        className="absolute top-1/2 right-4 -translate-y-1/2"
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <Octicons
                          name={passwordVisible ? "eye-closed" : "eye"}
                          size={16}
                          color="#ACB5BB"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.password && (
                  <Text className="font-lexend300 text-xs leading-[1.2] text-[#F23C3C] mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View className="flex-row justify-end">
                <Link href="auth/sucess">
                  <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">
                    Forgot Password?
                  </Text>
                </Link>
              </View>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View className="shrink-0 px-10 pt-[30px] pb-14">
            <View className="mb-[35px]">
              <GradientButton
                title="Sign In"
                type="blue"
                onAction={handleSubmit(onSubmit)}
                disabled={!formFilled()}
              />
            </View>
            <View className="flex-row gap-1.5 justify-center">
              <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-[#6C7278]">
                Don’t have an account?
              </Text>
              <Link href="templates/bonus">
                <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
