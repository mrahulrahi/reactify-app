import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback,
} from "react-native";
import GradientButton from "../../components/GradientButton";
const CustomModal = ({ visible, onClose, title, children, onSave }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-[#1E2024] rounded-t-lg pt-4 pb-[30px] px-5">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-[20px] font-lexend500 text-rally-white">{title}</Text>
                <TouchableOpacity onPress={onClose} className="me-1">
                  <Text className="text-rally-white text-xl">✕</Text>
                </TouchableOpacity>
              </View>
              {/* Modal Content */}
              {children}
              {/* Save Button */}              
              <View className="mt-3.5"><GradientButton title="Save" type="blue" onPress={onSave}/></View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
