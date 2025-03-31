import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";
import Entypo from '@expo/vector-icons/Entypo';


export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-rally-black grow">
        <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "space-between", gap: 30 }} className="grow bg-[#0F0F0F] rounded-t-[20px] p-5">
          <View className="flex-row items-center gap-[30px]">
            <View className="w-[84px] h-[84px] shrink-0 rounded-full relative">
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
                source={require("../../../assets/images/corey-herwitz.png")}
                contentFit="cover"
              />
              <TouchableOpacity
                onPress={() => alert("Edit Profile")}
                activeOpacity={0.8}
                className="w-[40px] h-[40px] border-[4.5px] flex items-center justify-center border-[#1E2024] absolute top-[-10px] right-[-10px] bg-[#1E2024] rounded-full"
              >
                <Feather name="edit-2" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="font-lexend500 text-[20px] leading-tight text-rally-white mb-1.5">CoreyHerwitz</Text>
              <Text className="font-lexend300 text-[13px] leading-[1.4] text-rally-white/60 mb-2.5">CoreyHerwitz@email.com</Text>
              <View className="flex-row items-center gap-2.5">
                <View className="w-[24px] h-[24px]">
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 100,
                    }}
                    source={require("../../../assets/images/coin.png")}
                    contentFit="cover"
                  />
                </View>

                <View className="flex-row items-center gap-1">
                  <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">1208</Text><Text className="font-lexend300 text-[14px] leading-tight text-rally-white/50">Rally Coins</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity activeOpacity={0.8} className="w-[24px] h-[32px] flex-row items-center justify-center shrink-0">
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-auto">
            <View className="flex-row items-end flex-1 gap-2.5">
              <View className="w-[68.25%] flex-col grow basis-0 gap-2.5">
                <View className="flex-row items-end gap-2.5">
                  <View className="flex-1 h-[180px] flex-col items-center justify-between px-3 py-[25px] bg-modal-bg-color rounded-[20px]">
                    <View className="flex-col">
                      <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/50 text-center">Total</Text>
                      <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/50 text-center">Settled Bets</Text>
                    </View>

                    <Text className="font-lexend300 text-[32px] leading-tight -tracking-tighter-[0.02em] text-rally-white text-center">100</Text>
                  </View>
                  <View className="flex-1 h-[267px] flex-col items-center justify-between px-3 py-[25px] bg-[#151619] rounded-[20px]">
                    <View className="flex-col">
                      <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/50 text-center">Total</Text>
                      <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/50 text-center">Active Bets</Text>
                    </View>

                    <Text className="font-lexend300 text-[32px] leading-tight -tracking-tighter-[0.02em] text-rally-white text-center">120</Text>
                  </View>
                </View>
                <View className="w-full h-[234px] flex-col items-start justify-between p-[24px] bg-[#14221e] border-2 border-rally-green rounded-[20px]">
                  <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/70 text-center">Total Bets Placed</Text>
                  <Text className="font-lexend300 text-[64px] leading-none -tracking-tighter-[0.02em] text-rally-white text-center">76</Text>
                </View>
              </View>
              <View className="w-[31.75%] flex-col shrink-0 basis gap-2.5">
                <View className="w-full h-[176px] flex-col items-center justify-between px-3 py-[25px] bg-modal-bg-color rounded-[20px]">
                  <View className="flex-col">
                    <Text className="font-lexend300 text-[14px] leading-tight text-[#A8A8A8]/80 text-center">Total</Text>
                    <Text className="font-lexend300 text-[14px] leading-tight text-[#A8A8A8]/80 text-center">Bets Won</Text>
                  </View>

                  <Text className="font-lexend300 text-[32px] leading-tight -tracking-tighter-[0.02em] text-rally-white text-center">20</Text>
                </View>
                <View className="w-full h-[152px] flex-col items-center justify-between px-3 py-[25px] bg-[#151619] rounded-[20px]">
                  <View className="flex-col">
                    <Text className="font-lexend300 text-[14px] leading-tight text-[#A8A8A8]/80 text-center">Total</Text>
                    <Text className="font-lexend300 text-[14px] leading-tight text-[#A8A8A8]/80 text-center">Bets Lost</Text>
                  </View>

                  <Text className="font-lexend300 text-[32px] leading-tight -tracking-tighter-[0.02em] text-rally-white text-center">24</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between px-5 py-1.5 mt-5">
              <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/60 uppercase">Total Coins Spent</Text>
              <Text className="font-lexend300 text-[32px] leading-tight -tracking-tighter-[0.02em] text-rally-white">-2,345</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
