import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  // Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
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
const ImageReferenceModal = ({
  isModalVisible,
  setIsModalVisible,
  setImage,
}) => {
  const [recentImages, setRecentImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      fetchGalleryImages();
    }
  }, [isModalVisible]);

  const handleOutsideClick = () => {
    setIsModalVisible(false); // Close the modal when clicking outside
  };

  const fetchGalleryImages = async () => {
    setIsLoading(true);
    try {
      const permissionResult = await MediaLibrary.requestPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Permission to access media library is required!"
        );
        return;
      }

      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        first: 20,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      setRecentImages(assets.assets);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      Alert.alert("Error", "Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  const openImagePicker = async (useCamera = false) => {
    try {
      const permissionResult = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          `Permission to access ${
            useCamera ? "camera" : "media library"
          } is required!`
        );
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images, // Correct reference
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

      if (!result.canceled) {
        setImage({ uri: result.assets[0].uri }); // Set the image object
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error opening image picker:", error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOutsideClick}
    >
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View className="flex-1 justify-end bg-black/80">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
              colors={["rgba(51, 52, 50, 1)", "rgba(0, 0, 0, 1)"]}
              locations={[0, 0.2]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ paddingHorizontal: 0, paddingBottom:27, paddingTop: 11}}
              className="py-[11px] px-4"
            >
              <View style={{paddingHorizontal:16}} className="flex-row items-center justify-between mb-[22px]">
                <Text className="font-inter500 text-2xl leading-none text-bs-white">
                  My Creations
                </Text>
              </View>
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className="grow-0 mb-4 -ms-4" style={{ width: width }}>
                  <View className="flex-row gap-2 px-4">
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-1']} resizeMode="cover" />
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-2']} resizeMode="cover" />
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-3']} resizeMode="cover" />
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-1']} resizeMode="cover" />
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-2']} resizeMode="cover" />
                      <Image className="!w-[148px] !h-[118px] rounded-2xl" source={images['img-3']} resizeMode="cover" />
                  </View>
              </ScrollView> */}
              {/* Custom images */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16, width: width, paddingHorizontal:16 }}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {Object.keys(images).map((key, index) => (
                      <Image
                      key={index}
                      style={{
                        height: 118,
                        width: imageWidths[index % imageWidths.length],
                        borderRadius: 17,
                        borderColor:'#3E3E3E',
                        borderWidth:1.17,
                      }}
                      source={images[key]}
                      contentFit="cover"
                      transition={1000}
                      />

                  ))}
                </View>
              </ScrollView>
              <View style={{paddingHorizontal:16}} className="flex-row items-center justify-between mb-3">
                <Text className="font-inter500 text-2xl leading-none text-bs-white">
                  Photos & Videos
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => openImagePicker(false)}
                >
                  <Text className="font-inter500 text-2xl leading-tight text-[#1E5AFF]">
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="grow-0 -ms-7"
                style={{ width: width,paddingHorizontal:16 }}
              >
                <View className="flex-row gap-2 px-7">
                  {isLoading ? (
                    <Text className="text-center text-bs-silver-sand font-inter400">
                      Loading...
                    </Text>
                  ) : recentImages.length > 0 ? (
                    recentImages.map((item) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={item.id}
                        className="w-[118px] aspect-square rounded-xl overflow-hidden"
                        onPress={() => {
                          setImage({ uri: item.uri }); // Set the image object
                          setIsModalVisible(false);
                        }}
                      >
                        <Image
                          className="!w-full !h-full"
                          source={{ uri: item.uri }}
                          contentFit="cover"
                          transition={1000}
                          style={{ width: "100%", height: "100%",borderRadius: 17, borderColor:'#3E3E3E', borderWidth:1.17, }}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-center text-bs-silver-sand font-inter400">
                      No recent images found.
                    </Text>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImageReferenceModal;
