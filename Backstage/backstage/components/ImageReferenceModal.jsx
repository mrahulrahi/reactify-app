import React from "react";
import { View, Modal, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");
const imageWidths = [149, 85, 118, 85];

const images = {
  "img-1": require("@/assets/images/creations-img.jpg"),
  "img-2": require("@/assets/images/creations-img-1.jpg"),
  "img-3": require("@/assets/images/creations-img-2.jpg"),
  "img-4": require("@/assets/images/creations-img-3.jpg"),
  "img-5": require("@/assets/images/creations-img.jpg"),
  "img-6": require("@/assets/images/creations-img-1.jpg"),
  "img-7": require("@/assets/images/creations-img-2.jpg"),
  "img-8": require("@/assets/images/creations-img-3.jpg"),
};

const ImageReferenceModal = ({ isModalVisible, setIsModalVisible }) => {
  return (
    <Modal transparent visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
      <View className="flex-1 justify-end bg-black/80">
        <LinearGradient
          colors={["rgba(51, 52, 50, 1)", "rgba(0, 0, 0, 1)"]}
          locations={[0, 0.2]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ paddingBottom: 27, paddingTop: 11 }}
          className="py-[11px] px-4"
        >
          <View style={{ paddingHorizontal: 16 }} className="flex-row items-center justify-between mb-[22px]">
            <Text className="font-inter500 text-2xl text-bs-white">My Creations</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 16, width, paddingHorizontal: 16 }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              {Object.keys(images).map((key, index) => (
                <Image
                  key={index}
                  style={{
                    height: 118,
                    width: imageWidths[index % imageWidths.length],
                    borderRadius: 17,
                    borderColor: "#3E3E3E",
                    borderWidth: 1.17,
                  }}
                  source={images[key]}
                  contentFit="cover"
                  transition={1000}
                />
              ))}
            </View>
          </ScrollView>

          <View className="px-5 pb-6 pt-[8px]">
            <LinearGradient
              colors={["#EF56EF", "#57B9FF"]}
              start={{ x:0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 50, padding: 1.2 }}
              className="p-[2px] rounded-full"
            >
              <TouchableOpacity
                activeOpacity={1}
                className="bg-black flex-row items-center justify-center py-[17px] px-6 rounded-full"
                onPress={() => setIsModalVisible(false)}
              >
                <Image source={require("../assets/images/upload-icon.png")} style={{ width: 24, height: 24, marginRight: 12 }} />
                <Text className="font-bold text-[18px] text-white">Upload Media</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ImageReferenceModal;
