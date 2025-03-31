import React, { useState } from "react";
import { TextInput, View,Text } from "react-native";
import CustomModal from "./CustomModal";

const EditProfileModal = ({ visible, onClose }) => {
  const [username, setUsername] = useState("Loisbecker");
  const [email, setEmail] = useState("Loisbecker@gmail.com");

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Edit Profile"
      onSave={() => console.log("Profile Updated")}
    >
      {/* Input Fields */}
      <View className="mb-5">
        <Text className="text-[14px] font-lexend300 leading-[1.4] text-white">Username</Text>
        <TextInput
          className="font-lexend300 text-white p-3 text-[14px] leading-[1.4] h-[46px] bg-[#35373A] rounded-lg"
          placeholder="Username"
          placeholderTextColor="rgba(255, 255, 255, 0.5)" 
          value={username}
          onChangeText={setUsername}
        />
      </View>


      <View className="mb-4">
        <Text className="text-[14px] font-lexend300 leading-[1.4] text-white">Email</Text>
        <TextInput
          className="font-lexend300 text-white p-3 text-[14px] leading-[1.4] h-[46px] bg-[#35373A] rounded-lg"
          placeholder={email}
          placeholderTextColor="rgba(255, 255, 255, 0.5)" 
          // value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
    </CustomModal>
  );
};

export default EditProfileModal;
