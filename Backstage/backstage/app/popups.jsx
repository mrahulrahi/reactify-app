import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";


// Icons
const userIcon = require('@/assets/images/user-icon.png');

const Popups = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1' edges={['top']}>        
        <View className='flex-1 pt-2.5 bg-bs-bg-color'>
          <View className='flex-row items-center justify-between p-2.5'>
            {/* Back Button */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} className="p-2">
              <FontAwesome6 name="chevron-left" size={26} color="white" />
            </TouchableOpacity>

            {/* User Profile Info */}
            <TouchableOpacity
              activeOpacity={1}
              className="flex-row items-center gap-3"
            >
              <Image className="!w-[35px] !h-[35px]" source={userIcon} resizeMode="contain" />
              <Text className="font-inter700 text-base leading-tight text-bs-white">
                Jimmy Simmons
              </Text>
            </TouchableOpacity>

            {/* Help Button */}
            <TouchableOpacity activeOpacity={0.7} 
            
            className="p-2">
              <Octicons name="question" size={26} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 px-4 gap-4">

            <View className="flex-row items-center gap-4 px-2 py-3 pe-[14px] bg-[#141414] border border-[#000000] rounded-[20px]">
              <View className="w-[72px] h-[78px] shrink-0 rounded-[10px] overflow-hidden">
                <Image className="!w-full !h-full" source={require("../assets/images/generation-started-img.jpg")} resizeMode="cover" />
              </View>

              <View className="flex-1">
                <Text className="font-inter400 text-[15px] leading-tight text-bs-white mb-[5px]">Generation started.</Text>
                <Text className="font-inter400 text-[13px] leading-tight text-[#D0D0D0]">Upgrade for faster speeds!</Text>
              </View>

              <TouchableOpacity activeOpacity={1} className="flex-shrink-0">
                <View className="flex-row items-center px-4 py-2 rounded-full gap-2 border border-white">
                  <Image style={{width:24,height:24}} className="w-6 h-6" source={require("@/assets/images/icon-1.png")} resizeMode="contain" />
                  <Text className="font-inter700 text-[15px] text-white">Upgrade</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-4 px-2 py-3 pe-[14px] bg-[#141414] border border-[#000000] rounded-[20px]">
              <View className="w-[72px] h-[78px] shrink-0 rounded-[10px] overflow-hidden">
                <Image className="!w-full !h-full" source={require("../assets/images/generation-completed-img.jpg")} resizeMode="cover" />
              </View>

              <View className="flex-1">
                <Text className="font-inter400 text-[15px] leading-tight text-bs-white mb-[5px]">Generation complete!</Text>
                <Text className="font-inter400 text-[13px] leading-tight text-[#D0D0D0]">View assets in your creations</Text>
              </View>

              <TouchableOpacity activeOpacity={1} className="flex-shrink-0">
                <LinearGradient
                  colors={['#EF56EF', '#57B9FF']}
                  start={{ x: 0.23, y: 0.1 }}
                  end={{ x: 0.95, y: 0.88 }}
                  style={{ padding: 1, borderRadius: 60 }}
                >
                  <View
                    style={{
                      minWidth: 105,
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      borderRadius: 50,
                      gap: 8,
                    }}
                  >
                    <Image
                      source={require("../assets/images/action-icon-2.png")}
                      style={{ width: 22, height: 22 }}
                      contentFit="contain"
                      transition={1000}
                    />
                    <Text className="font-inter700 text-[15px] leading-tight text-[#FDFDFD]">
                      View
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-4 px-2 py-3 pe-[14px] bg-[#141414] border border-[#000000] rounded-[20px]">
              <View className="w-[72px] h-[78px] shrink-0 rounded-[10px] overflow-hidden">
                <Image className="!w-full !h-full" source={require("../assets/images/generation-failed-img.jpg")} resizeMode="cover" />
              </View>

              <View className="flex-1">
                <Text className="font-inter400 text-[15px] leading-tight text-bs-white mb-[5px]">Generation failed.</Text>
                <Text className="font-inter400 text-[13px] leading-tight text-[#D0D0D0]">Would you like to try again?</Text>
              </View>

              <TouchableOpacity activeOpacity={1} className="flex-shrink-0">
                <View className="flex-row items-center px-4 py-2 rounded-full gap-2 border border-white">
                  <Image style={{width:24,height:24}} className="w-6 h-6" source={require("@/assets/images/reload-icon.png")} resizeMode="contain" />
                  <Text className="font-inter700 text-[15px] text-white">Try again</Text>
                </View>
              </TouchableOpacity>
            </View>


            <View className="flex-row items-center gap-4 px-2 py-3 pe-[14px] bg-[#141414] border border-[#000000] rounded-[20px]">
              <View className="w-[72px] h-[78px] shrink-0 rounded-[10px] overflow-hidden">
                <Image className="!w-full !h-full" source={require("../assets/images/generation-failed-img.jpg")} resizeMode="cover" />
              </View>

              <View className="flex-1">
                <Text className="font-inter400 text-[15px] leading-tight text-bs-white mb-[5px]">Something went wrong.</Text>
                <Text className="font-inter400 text-[13px] leading-tight text-[#D0D0D0]">Relevant Error details - etc..</Text>
              </View>

              <TouchableOpacity activeOpacity={1} className="flex-shrink-0">
                <View style={{ flexDirection: "row", alignItems: "center", padding: 7, borderRadius: 50, gap: 8, border: "1px solid #ffffff", }}
                >
                  <Image
                    source={require("../assets/images/close.png")}
                    style={{ width: 24, height: 24 }}
                    contentFit="contain"
                    transition={1000}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-4 px-4 py-[19px] pe-5 bg-[#333333] rounded-[30px]">
              <View className="w-[49px] h-[49px] shrink-0 rounded-[10px] overflow-hidden">
                <Image className="!w-full !h-full" source={require("../assets/images/notification-app-icon.jpg")} resizeMode="cover" />
              </View>

              <View className="flex-1">
                <Text className="font-inter600 text-[15px] leading-tight text-bs-white mb-[5px]">Your Creation is Ready!</Text>
                <Text className="font-inter400 text-[13px] leading-tight text-[#D0D0D0]">Make more ideas a reality in Backstage.</Text>
              </View>

              <View activeOpacity={1} className="flex-col items-end flex-shrink-0 gap-2">
                <Text className="font-inter400 text-[15px] leading-tight text-[#D0D0D0]">3h ago</Text>
                <Image
                  source={require("../assets/images/notification-img.jpg")}
                  style={{ width: 40, height: 40, borderRadius: 10, }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            </View>
            
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};



export default Popups;


