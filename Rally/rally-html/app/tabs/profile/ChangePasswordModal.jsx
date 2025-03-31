import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons"; // Ensure you have this installed if using Expo
import CustomModal from "./CustomModal";

const UpdatePasswordModal = ({ visible, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Update Password"
      onSave={() => console.log("Password Updated")}
    >
      {/* New Password Field */}
      <View className="mb-5">
        <Text className="text-[14px] font-lexend300 leading-[1.4] text-white">Enter New Password</Text>
        <View className="bg-[#35373A] flex-row items-center rounded-lg px-[14px]">
          <TextInput
            className="flex-1 text-white font-lexend300 text-[12px] py-[14px] h-[46px]"
            placeholder="Enter New Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Octicons
              name={passwordVisible ? "eye-closed" : "eye"}
              size={16}
              color="#ACB5BB"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Field */}
      <View className="mb-4">
        <Text className="text-[14px] font-lexend300 leading-[1.4] text-white mb-1">Confirm New Password</Text>
        <View className="bg-[#35373A] flex-row items-center rounded-lg px-[14px]">
          <TextInput
            className="flex-1 text-white font-lexend300 text-[12px] py-[14px] h-[46px]"
            placeholder="Confirm New Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)" 
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Octicons
              name={confirmPasswordVisible ? "eye-closed" : "eye"}
              size={16}
              color="#ACB5BB"
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

export default UpdatePasswordModal;
