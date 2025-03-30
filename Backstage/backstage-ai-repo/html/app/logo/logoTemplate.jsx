import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native"; 
import CustomHeader from "@/components/CustomHeader";
import { Image } from "expo-image";

const images = {
  'img-1': require('@/assets/images/createLogo/logo-templates-img-1.jpg'),
  'img-2': require('@/assets/images/createLogo/logo-templates-img-2.jpg'),
  'img-3': require('@/assets/images/createLogo/logo-templates-img-3.jpg'),
  'img-4': require('@/assets/images/createLogo/logo-templates-img-4.jpg'),
  'img-5': require('@/assets/images/createLogo/logo-templates-img-5.jpg'),
  'img-6': require('@/assets/images/createLogo/logo-templates-img-6.jpg'),
  'img-7': require('@/assets/images/createLogo/logo-templates-img-7.jpg'),
  'img-8': require('@/assets/images/createLogo/logo-templates-img-8.jpg'),
  'img-9': require('@/assets/images/createLogo/logo-templates-img-9.jpg'),
};


const DATA = [
  { id: "1", img: "img-1", height: 118 },
  { id: "2", img: "img-2", height: 246 },
  { id: "3", img: "img-3", height: 118 },
  { id: "4", img: "img-4", height: 203 },
  { id: "5", img: "img-5", height: 203 },
  { id: "6", img: "img-6", height: 203 },
  { id: "7", img: "img-7", height: 118 },
  { id: "8", img: "img-8", height: 203 },
  { id: "9", img: "img-9", height: 246 },
];


const Item = ({ img, height, id }) => {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      className="flex-1 mx-1 rounded-xl overflow-hidden border border-[#3E3E3E] mb-2"
      activeOpacity={0.8}
      onPress={() => navigation.navigate("logo/logoTemplateSelected", { id })} // Navigate to detail screen
    >
      <Image className="w-full rounded-xl" style={{width: "100%", height }} source={images[img]} contentFit="cover"
        transition={1000}
       />
    </TouchableOpacity>
  );
};

const LogoTemplates = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0E0F11]">
      <CustomHeader showBackTitle={false} showTitle={true} title="Logo Templates" />

      <View className="flex-1">
        <MasonryFlashList
          data={DATA}
          numColumns={2}
          renderItem={({ item }) => <Item id={item.id} img={item.img} height={item.height} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={200}
        />
      </View>
    </SafeAreaView>
  );
};

export default LogoTemplates;
