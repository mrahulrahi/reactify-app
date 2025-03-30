
import { Text, View, Image, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const Card = ({id, title, description, image }) => (
  <Animated.View entering={FadeInUp.delay(100 * id).duration(500)} className="w-full flex !flex-row p-3.5 border border-[#464646] rounded-[30px]">
    <View className="w-[108px] h-[108px] shrink-0 rounded-[18px] overflow-hidden border-[1.17px] border-[#3E3E3E]">
      <Image resizeMode="cover"
        source={image}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
    <View className="flex-1 pl-6">
      <View className="w-full flex !flex-row relative">
        <View className="flex-1">
          <Text className="text-2xl leading-normal font-poppins400 text-white mb-2">{title}</Text>
          <Text className="text-[14px] leading-[1.21] font-inter500 text-bs-light-gray">{description}</Text>
        </View>
        <View className="w-[24px] self-end shrink-0 h-[24px] rounded-full border border-white flex items-center justify-center">    
          <Image resizeMode="contain" source={require("../assets/images/right-arrow.png")} style={{ width: 14, height: 14,}} />
        </View>
      </View>
    </View>
  </Animated.View>
);

export default Card;
