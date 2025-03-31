import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Platform,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import GradientButton from "../components/GradientButton";
import BackHeader from "../components/BackHeader";
import Octicons from "@expo/vector-icons/Octicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema using Zod
const validationSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be 4-32 characters long")
    .max(32, "Username must be 4-32 characters long"),
  email: z.string().email("Invalid Email address"),
  dateOfBirth: z.string().refine((value) => {
    const birthDate = new Date(value);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear() >= 18;
  }, "You must be at least 18 years of age to use this app"),
  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 char long and contain at least 1 number and 1 letter"
    )
    .regex(
      /[a-zA-Z]/,
      "Password must be at least 8 char long and contain at least 1 number and 1 letter"
    )
    .regex(
      /[0-9]/,
      "Password must be at least 8 char long and contain at least 1 number and 1 letter"
    ),
  termsAccepted: z.boolean().refine((value) => value === true),
});

export default function Signup() {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Initialize form handling with react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      dateOfBirth: "",
      password: "",
      termsAccepted: false,
    },
  });

  const formValues = watch(); // Get current form values

  // Check if all required form fields are filled
  const formFilled = () => {
    return (
      formValues.username &&
      formValues.email &&
      formValues.dateOfBirth &&
      formValues.password
    );
  };

  // Handle form submission
  const onSubmit = (data) => {
    Alert.alert("Success", "Account Created Successfully");
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
                Sign Up
              </Text>
            </View>

            <View>
              {/* Username Input */}
              <View className="mb-[22px]">
                <Text className="font-lexend300 text-[14px] leading-[1.4] text-rally-white mb-0.5">
                  Username
                </Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <TextInput
                      className={`h-[46px] p-3.5 font-lexend300 text-[14px] leading-none text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
                        errors.username
                          ? "border border-[#F23C3C]"
                          : "border-transparent"
                      }`}
                      placeholder="Enter Username"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                {errors.username && (
                  <Text className="font-lexend300 text-xs leading-[1.2] text-[#F23C3C] mt-1">
                    {errors.username.message}
                  </Text>
                )}
              </View>

              {/* Email Input */}
              <View className="mb-[22px]">
                <Text className="font-lexend300 text-[14px] leading-[1.4] text-rally-white mb-0.5">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextInput
                      inputMode="email"
                      keyboardType="email-address"
                      className={`h-[46px] p-3.5 font-lexend300 text-[14px] leading-none text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
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

              {/* Date Of Birth Input */}
              {/* <View className="mb-5">
                <Text className="font-lexend300 text-[14px] leading-[1.4] text-rally-white mb-0.5">
                  Date of Birth
                </Text>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <TextInput
                      inputMode="numeric"
                      dataDetectorTypes="calendarEvent"
                      keyboardType="numeric"
                      className={`h-[46px] p-3.5 font-lexend300 text-[14px] leading-none text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
                        errors.dateOfBirth
                          ? "border border-[#F23C3C]"
                          : "border-transparent"
                      }`}
                      placeholder="MM/DD/YYYY"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <Text className="font-lexend300 text-xs leading-[1.2] text-[#F23C3C] mt-1">
                    {errors.dateOfBirth.message}
                  </Text>
                )}
              </View> */}
              <View className="mb-[22px]">
                <Text className="font-lexend300 text-[14px] leading-[1.4] text-rally-white mb-0.5">
                  Date of Birth
                </Text>

                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <>
                      <Pressable onPress={() => setShowPicker(true)}>
                        <TextInput
                          className={`h-[46px] p-3.5 font-lexend300 text-[14px] leading-none text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
                            errors.dateOfBirth
                              ? "border border-[#F23C3C]"
                              : "border-transparent"
                          }`}
                          placeholder="MM/DD/YYYY"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={
                            field.value
                              ? new Date(field.value).toLocaleDateString()
                              : ""
                          }
                          editable={false} // Prevent manual input
                        />
                      </Pressable>

                      {/* iOS - Show picker in a modal */}
                      {Platform.OS === "ios" && (
                        <Modal
                          transparent
                          animationType="slide"
                          visible={showPicker}
                          onRequestClose={() => setShowPicker(false)}
                        >
                          <View className="flex-1 justify-end bg-black/50">
                            <View className="bg-white p-4 rounded-t-lg">
                              <DateTimePicker
                                value={
                                  field.value
                                    ? new Date(field.value)
                                    : new Date()
                                }
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                  if (selectedDate) setTempDate(selectedDate);
                                }}
                              />
                              <Pressable
                                onPress={() => {
                                  field.onChange(tempDate.toISOString());
                                  setShowPicker(false);
                                }}
                                className="p-3 bg-blue-500 text-center rounded-md"
                              >
                                <Text className="text-white font-bold">
                                  Confirm
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        </Modal>
                      )}

                      {/* Android - Show inline picker */}
                      {Platform.OS === "android" && showPicker && (
                        <DateTimePicker
                          value={
                            field.value ? new Date(field.value) : new Date()
                          }
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate)
                              field.onChange(selectedDate.toISOString());
                          }}
                        />
                      )}
                    </>
                  )}
                />

                {errors.dateOfBirth && (
                  <Text className="font-lexend300 text-xs leading-[1.2] text-[#F23C3C] mt-1">
                    {errors.dateOfBirth.message}
                  </Text>
                )}
              </View>

              {/* Password Input with Toggle Visibility */}
              <View className="mb-0">
                <Text className="font-lexend300 text-[14px] leading-[1.4] text-rally-white mb-0.5">
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <View className="flex-row items-center relative">
                      <TextInput
                        secureTextEntry={!passwordVisible}
                        className={`flex-1 p-3.5 pe-10 font-lexend300 text-[14px] leading-[1.4] text-rally-white bg-rally-white/10 rounded-[10px] outline-none focus:outline-none ${
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
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View className="shrink-0 px-10 pt-[30px] pb-14">
            <Controller
              control={control}
              name="termsAccepted"
              render={({ field }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => field.onChange(!field.value)}
                >
                  <View className="flex-row gap-3 mb-5">
                    <Pressable
                      className={`w-5 h-5 border border-solid rounded-[4px] 
                ${
                  field.value
                    ? "bg-rally-blue border-rally-blue"
                    : errors.termsAccepted
                    ? "border-[#F23C3C]"
                    : "border-rally-white"
                }
                flex items-center justify-center`}
                      onPress={() => field.onChange(!field.value)}
                    >
                      {field.value && (
                        <Image
                          source={require("../../assets/images/check-icon.png")}
                          style={{ width: 10, height: 8 }}
                          contentFit="contain"
                        />
                      )}
                    </Pressable>
                    <Text
                      className={`font-lexend400 text-sm leading-[1.6] tracking-[-0.01em] ${
                        errors.termsAccepted
                          ? "text-[#F23C3C]"
                          : "text-rally-white"
                      }`}
                    >
                      I accept the Terms of use, Privacy Policy and Sweepstakes
                      Rules of Rally App
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <View className="mb-[35px]">
              <GradientButton
                title="Create Account"
                type="blue"
                onAction={handleSubmit(onSubmit)}
                disabled={!formFilled()}
              />
            </View>
            <View className="flex-row gap-1.5 justify-center">
              <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-[#6C7278]">
                Already have an account?
              </Text>
              <Link href="auth/signin">
                <Text className="font-lexend500 text-base leading-[1.4] tracking-[-0.01em] text-rally-blue">
                  Sign In
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
