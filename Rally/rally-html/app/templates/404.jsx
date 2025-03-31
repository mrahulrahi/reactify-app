import { View, Text} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { Image } from "expo-image";

  export default function NotFound() {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <View className="bg-rally-bg-color justify-center items-center flex-1">            
            <View className="w-full max-w-[298px] items-center">
                <Text className="text-center font-lexend400 text-[16px] text-rally-white/50">ERROR</Text>
                <View className="w-[230px] h-[230px] mx-auto">
                  <Image
                    source={require("../../assets/images/404.png")}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="contain"
                  />
                </View>
                <Text className="text-center font-lexend500 text-[24px] text-rally-white mb-2.5">Page Not Found!</Text>
                <Text className="text-center font-lexend300 text-[14px] leading-[1.4] text-rally-white/60 ">The page you’re looking for doesn’t seem to exist or might have been moved.</Text>
                <View className="mt-20">
                  <Link href="/" className="bg-[#1E90FF] min-w-[195px] rounded-[60px] font-lexend400 text-[14px] text-white py-2.5 px-5 text-center">Back to Home</Link>
                </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  