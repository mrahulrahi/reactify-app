import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditProfileModal = ({ visible, onClose, onOpenAvatarModal }) => {
  // Open system gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected Image: ", result.assets[0].uri);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-[#1E2024] rounded-t-lg pb-4">
              <View className="flex-row justify-between items-center pt-3.5 px-5 pb-4">
                <Text className="text-[20px] font-lexend500 text-rally-white">
                  Edit Profile Picture
                </Text>
                <TouchableOpacity onPress={onClose} className="me-1">
                  <Text className="text-rally-white text-xl">✕</Text>
                </TouchableOpacity>
              </View>              
              <View className="p-5 border-y border-rally-white/10">
                <TouchableOpacity onPress={pickImage}>
                  <Text className="font-lexend300 text-[18px] leading-[1.4] text-rally-white">Choose Your Photo</Text>
                </TouchableOpacity>
              </View>
              <View className="p-5 border-b border-rally-white/10">
                <TouchableOpacity onPress={onOpenAvatarModal}>
                  <Text className="font-lexend300 text-[18px] leading-[1.4] text-rally-white">Choose Avatar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditProfileModal;
