import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function Login() {
  
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="relative flex-1 bg-black items-center justify-center pb-[120px]">
          <View className="absolute top-0 left-0 bottom-0 right-0">
            <Image
              source={require("@/assets/images/mesh-gradient-bg.png")}
              contentFit="cover"
              transition={1000}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View className="w-full h-full items-center justify-center">
            <Image
              source={require("@/assets/images/backstage-logo.png")}
              contentFit="contain"
              transition={1000}
              style={{ width: 260, height: 214 }}
            />
          </View>

          <View className="w-full absolute bottom-12 justify-center items-center gap-5 ">
            {/* Buttons */}
            <View className="flex-col gap-2 w-4/5 max-w-[289px]">
              <TouchableOpacity
                activeOpacity={1}
                className="bg-bs-white rounded-full py-[13px] px-[15px] flex flex-row items-center justify-center"
                onPress={() => router.push("auth/signup")}
              >
                <Image
                  source={require("@/assets/images/apple-icon.png")}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                  contentFit="contain"
                  transition={1000}
                />
                <Text className="font-inter600 text-lg text-bs-black">
                  Sign in with Apple
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                className="bg-bs-white rounded-full py-[13px] px-[15px] flex flex-row items-center justify-center"
                
              >
                <Image
                  source={require("@/assets/images/google-icon.png")}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                  contentFit="contain"
                  transition={1000}
                />
                <Text className="font-inter600 text-lg text-bs-black">
                  Sign in with Google
                </Text>
              </TouchableOpacity>
            </View>
            {/* Terms and Privacy Links */}
            <View className=" flex-row gap-10">
              <TouchableOpacity activeOpacity={1}>
                <Text className="text-bs-gray underline text-[16px] leading-none font-inter400">
                  Terms
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <Text className="text-bs-gray underline text-[16px] leading-none font-inter400">
                  Privacy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
