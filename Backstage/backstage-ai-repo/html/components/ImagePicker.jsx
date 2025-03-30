import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, Dimensions } from "react-native";

import ImageReferenceModal from "./ImageReferenceModal";
import StyleReferenceModal from "./StyleReferenceModal";

const { width } = Dimensions.get("window");
const icon1 = require("@/assets/images/action-icon-1.png");

const styleImg1 = require("@/assets/images/style-img-1.jpg");
const styleImg2 = require("@/assets/images/style-img-2.jpg");
const styleImg3 = require("@/assets/images/style-img-3.jpg");

const styleCards = [
  { id: 1, img: icon1, title: "Add Image" },
  { id: 2, img: styleImg2, title: "Neon Wave" },
  { id: 3, img: styleImg3, title: "Style Image" },
  { id: 4, img: styleImg1, title: "Comic Book" },
];

const ImagePickerComponent = ({
  title,
  icon,
  modalType,
  setFocusedPicker,
  focusedPicker,
}) => {
  const [isGalleryModalVisible, setIsGalleryModalVisible] = useState(false);
  const [isStyleModalVisible, setIsStyleModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [activeStyleCard, setActiveStyleCard] = useState(null);

  const handlePress = () => {
    if (modalType === "gallery") {
      setIsGalleryModalVisible(true);
    } else if (modalType === "style") {
      setIsStyleModalVisible(true);
    }
  };

  const handleFocus = () => {
    setFocusedPicker(title);
  };

  const handleBlur = () => {
    if (focusedPicker === title) {
      setFocusedPicker(null);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        className={`h-[107px] items-center bg-bs-bg-color/50 border border-[#3E3E3E] rounded-[18px] overflow-hidden ${
          image ? "p-0" : "p-4"
        } ${focusedPicker === title ? "bg-[#4F5455] border-bs-white" : ""}`}
        style={{ width: width / 2 - 30 }}
        onPress={handlePress}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {image ? (
          <>
            <Image
              className="!w-full !h-full"
              source={image}
              resizeMode="cover"
            />
            <View className="absolute top-0 left-1/2 -translate-x-1/2 flex-row items-center gap-1.5 py-1 px-5 bg-black/80 border border-bs-black rounded-b-[20px]">
              <Image className="!w-5 !h-5" source={icon} resizeMode="contain" />
              <Text className="font-inter500 text-xs leading-none text-bs-white">
                {title.split(` `)[0]}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text className="font-inter400 text-base leading-tight text-bs-silver-sand mb-4">
              {title}
            </Text>
            <Image className="!w-8 !h-8" source={icon} resizeMode="contain" />
          </>
        )}
      </TouchableOpacity>

      {/* Conditionally Render Modals */}
      {isGalleryModalVisible && (
        <ImageReferenceModal
          isModalVisible={isGalleryModalVisible}
          setIsModalVisible={setIsGalleryModalVisible}
          setImage={setImage}
        />
      )}
      {isStyleModalVisible && (
        <StyleReferenceModal
          isVisible={isStyleModalVisible}
          setIsVisible={setIsStyleModalVisible}
          styleCards={styleCards}
          activeStyleCard={activeStyleCard}
          setActiveStyleCard={setActiveStyleCard}
          setImage={setImage}
        />
      )}
    </>
  );
};

export default ImagePickerComponent;
