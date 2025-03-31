import { Text, View, Image, TouchableOpacity } from "react-native";

export default function AssetCard({ type, title, image }) {
  const imageSource =
    typeof image === "string" && image.startsWith("http")
      ? { uri: image } 
      : image

  return (
    <View className="flex-1 flex-row">
      <View className="w-[75px] h-[70px] rounded-[12px] border border-[#000] shrink-0">
        <View className="w-full h-full absolute left-0 right-0 top-0 bottom-0">
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 12 }}
            source={imageSource || require("../assets/images/g-image-1.jpg")}
          />
        </View>
      </View>
      <View className="flex-1 ps-4">
        <Text className="font-inter400 text-[#D0D0D0] text-[16px]">{title}</Text>
        <View className="mt-3 flex-row gap-2.5 ">
          <TouchableOpacity className="ps-2 pe-3 py-1.5 bg-black/20 border border-black rounded-[10px] flex-row items-center">
            <Image
              style={{ width: 24, height: 24 }}
              source={type === "video" ? require("../assets/images/videocam.png") : require("../assets/images/add-photo.png")}
            />
            <Text className="text-white text-xs ml-1">{type === "video" ? "Video" : "Image"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-2.5 py-1.5 bg-black/20 border border-black rounded-[10px] flex-row items-center">
            <Image style={{ width: 14, height: 14 }} source={require("../assets/images/resize.png")} />
            <Text className="text-white text-xs ml-1">1:1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
