import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import * as Progress from "react-native-progress";

export default function Summary() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 1 ? prev + 0.1 : 1));
        }, 500);

        return () => clearInterval(interval);
    }, []);

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
                        <View className="p-5 border-b border-rally-white/10">
                            <View className="py-5 px-3.5 bg-rally-bg-color/70 rounded-lg flex-row"></View>
                        </View>

                        <View className="flex-row items-center justify-between p-5 border-b border-rally-white/10">
                            <Text className="font-lexend400 text-[15px] leading-tight text-rally-white">New York Knicks</Text>
                            <Text className="font-lexend400 text-[15px] leading-tight text-rally-white">Brooklyn Nets</Text>
                        </View>

                        <View className="flex-col gap-[40px] p-5">
                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Moneyline</Text>
                                <View className="flex-col gap-5">
                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="72%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                    </View>

                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="72%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Point Spread</Text>
                                <View className="flex-col gap-5">
                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="34%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                    </View>

                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="17%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text className="font-lexend400 text-[18px] leading-tight text-rally-white mb-[18px]">Total Score</Text>
                                <View className="flex-col gap-5">
                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="34%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">Under</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">Over</Text>
                                        </View>
                                    </View>

                                    <View className="flex-col gap-2.5">
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">72%</Text>
                                            <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">% of Picks</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">28%</Text>
                                        </View>
                                        <View className="bg-[#0957FF] rounded-[10px] overflow-hidden">
                                            <Progress.Bar progress={progress} width="17%" height={6} color="#FFB200" borderRadius={0} />
                                        </View>
                                        <View className="flex-row items-center justify-between">
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">Under</Text>
                                            <Text className="font-lexend400 text-[14px] leading-tight text-rally-white">Over</Text>
                                        </View>
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
