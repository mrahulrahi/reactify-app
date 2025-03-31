import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';


export default function GameLines() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="bg-rally-bg-color flex-1">
                    <View className="flex-row items-end gap-[13px] px-5 pt-[46px] pb-[18px]">
                        <View>
                            <TouchableOpacity activeOpacity={0.8} className="w-[24px] h-[24px] flex-row items-center justify-center">
                                <Entypo name="chevron-left" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-col">
                            <View className="flex-row items-center gap-2.5 mb-[5px]">
                                <View className="flex-row items-center gap-1.5">
                                    <Image
                                        className="!w-3.5 !h-3.5"
                                        source={require("../../assets/images/nba-icon.png")}
                                        resizeMode="contain"
                                    />
                                    <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70">
                                        NBA
                                    </Text>
                                </View>
                                <View className="w-[1px] h-3.5 bg-rally-white/50"></View>
                                <View className="flex-row items-center gap-1.5">
                                    <Text className="font-lexend300 text-[12px] leading-tight text-rally-white">
                                        1st Quarter
                                    </Text>
                                    <View className="w-4 h-4 bg-rally-blue/20 rounded-full items-center justify-center">
                                        <View className="w-2 h-2 bg-rally-blue rounded-full"></View>
                                    </View>
                                </View>
                            </View>
                            <Text className="font-lexend300 text-[14px] leading-tight -tracking-[0.02em] text-rally-white">New York Knicks vs Brooklyn Nets</Text>
                        </View>
                    </View>
                    
                    <View className="flex-col bg-black/50 min-h-screen rounded-t-[20px]">
                        <View className="p-5">
                            <View className="py-5 px-3.5 bg-rally-bg-color/70 rounded-lg flex-row"></View>
                        </View>

                        <View className="flex-col gap-[30px] py-2.5 px-5">
                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Point Spread</Text>
                                <View className="flex-row gap-2.5">
                                    <View className="flex-1 p-4 bg-[#463816] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">New York Knicks -10.5</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">-120</Text>
                                    </View>
                                    <View className="flex-1 p-4 bg-[#193149] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">Brooklyn Nets +10.5</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">-110</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Total Score</Text>
                                <View className="flex-row gap-2.5">
                                    <View className="flex-1 p-4 bg-[#463816] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">Over 218.5</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">-120</Text>
                                    </View>
                                    <View className="flex-1 p-4 bg-[#193149] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">Under 218.5</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">-110</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Moneyline</Text>
                                <View className="flex-row gap-2.5">
                                    <View className="flex-1 p-4 bg-[#463816] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">New York Knicks</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">-590</Text>
                                    </View>
                                    <View className="flex-1 p-4 bg-[#193149] rounded-[10px]">
                                        <Text className="font-lexend400 text-[14px] leading-tight text-rally-white/70 mb-[18px]">Brooklyn Nets</Text>
                                        <Text className="font-Roboto700 text-[20px] leading-[1.15] text-rally-white">+380</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
