import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';
const userIcon = require('@/assets/images/user-icon.png');
const NoCreations = () => {
   const navigation = useNavigation();
   const router = useRouter();
   const snapPoints = useMemo(() => ["40%"], []);
   const bottomSheetRef = useRef(null);
   const openBottomSheet = () => {
      bottomSheetRef.current?.snapToIndex(0);
   };
   const closeBottomSheet = () => {
      bottomSheetRef.current?.close();
   };

   const bottomSheetRef2 = useRef(null);
   const openBottomSheet2 = () => {
      bottomSheetRef2.current?.snapToIndex(0);
   };
   const closeBottomSheet2 = () => {
      bottomSheetRef2.current?.close();
   };
   return (
      <SafeAreaProvider>
         <SafeAreaView className='flex-1' edges={['top']}>
            <GestureHandlerRootView>
               <View className='flex-1 bg-bs-bg-color'>
                  <View className='flex-row justify-between items-center p-2.5'>
                     {/* Back Button */}
                     <TouchableOpacity activeOpacity={0.7} onPress={() =>
                        navigation.goBack()} className="p-2">
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
                        onPress={openBottomSheet2}
                        className="p-2">
                        <Image
                           source={require("../../assets/images/logout-icon.png")}
                           style={{ width: 24, height: 24 }}
                           contentFit="contain"
                           transition={1000} />
                     </TouchableOpacity>
                  </View>
                  <View className='flex-1 px-4'>
                     <View className="px-2.5 mb-4">
                        <Text className="font-inter500 text-2xl leading-tight text-bs-white mb-1">My Creations</Text>
                        <Text className="font-inter300 text-lg leading-tight text-[#9D9D9D]">You haven’t made anything yet  ¯\_(ツ)_/¯</Text>
                     </View>
                     <View className="px-2.5 mb-[26px]">
                        <Text className="font-poppins500 text-[32px] leading-tight text-bs-white mb-1">Make your first creation!</Text>
                        <Text className="font-inter300 text-lg leading-tight text-[#9D9D9D]">Here’s a few ideas:</Text>
                     </View>
                     <View className="flex-col items-start gap-5">
                        <TouchableOpacity activeOpacity={1}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/action-icon-5.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Create a logo
                                 </Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/action-icon-4.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Make an image
                                 </Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/video-icon.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Generate a video
                                 </Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/video-icon.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Generate a video
                                 </Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>
                        <Pressable activeOpacity={1} onPress={() => router.push("popups")}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/icon-1.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Open Alerts
                                 </Text>
                              </View>
                           </LinearGradient>
                        </Pressable>
                        <TouchableOpacity activeOpacity={1} onPress={openBottomSheet}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[265px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <Image
                                    source={require("../../assets/images/video-icon.png")}
                                    style={{ width: 28, height: 28 }}
                                    contentFit="contain"
                                    transition={1000}
                                 />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Open Bottom Sheet
                                 </Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={openBottomSheet}>
                           <LinearGradient
                              colors={['#EF56EF', '#57B9FF']}
                              start={{ x: 0.23, y: 0.1 }}
                              end={{ x: 0.95, y: 0.88 }}
                              style={{ padding: 1, borderRadius: 60 }}
                           >
                              <View className='min-w-[176px] flex-row items-center bg-black px-4 py-[14px] rounded-[50px] gap-[6px]'>
                                 <SimpleLineIcons name="refresh" size={24} color="#E8EAED" />
                                 <Text className="font-inter700 text-xl leading-tight text-[#FDFDFD]">
                                    Generating
                                 </Text>
                                 <View className='w-[28px] h-[29px] bg-white/10 rounded-full flex items-center justify-center'>
                                    <Entypo name="chevron-right" size={14} color="#D9D9D9" />
                                 </View>

                              </View>
                           </LinearGradient>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>

               <BottomSheet
                  ref={bottomSheetRef}
                  index={-1}
                  snapPoints={snapPoints}
                  backgroundStyle={{ backgroundColor: "rgba(18, 18, 18, 0.9)" }}
                  handleIndicatorStyle={{ backgroundColor: '#ffffff' }}
                  backdropComponent={(props) => (
                     <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.5} // Adjust overlay darkness
                        pressBehavior="close" // Closes when tapping outside
                     />
                  )}
               >
                  <BottomSheetView className="pt-6 pb-12 px-10">
                     <View className="flex-col items-center">
                        <View className="w-full">
                           <View className="mb-[27px]">
                              <Text className="font-inter700 text-[20px] leading-tight text-bs-white mb-7 text-center">
                                 Delete Generation?
                              </Text>
                              <Text className="font-inter400 text-[15px] leading-tight text-[#D0D0D0] text-center">
                                 Are you sure you want to delete?
                              </Text>
                              <Text className="font-inter400 text-[15px] leading-tight text-[#D0D0D0] text-center">
                                 This cannot be undone.
                              </Text>
                           </View>
                           <View className="flex-col gap-6">
                              <Pressable activeOpacity={1}>
                                 <LinearGradient
                                    colors={["#EF56EF", "#57B9FF"]}
                                    start={{ x: 0.23, y: 0.1 }}
                                    end={{ x: 0.95, y: 0.88 }}
                                    style={{ padding: 1, borderRadius: 60 }}
                                 >
                                    <View className="flex-row items-center justify-center px-5 py-[18px] rounded-[50px]"
                                    >
                                       <Text className="font-inter700 text-[15px] leading-[18px] text-bs-white uppercase">
                                          DELETE
                                       </Text>
                                    </View>
                                 </LinearGradient>
                              </Pressable>
                              <Pressable
                                 activeOpacity={1}
                                 onPress={closeBottomSheet}
                              >
                                 <LinearGradient
                                    colors={["#EF56EF", "#57B9FF"]}
                                    start={{ x: 0.23, y: 0.1 }}
                                    end={{ x: 0.95, y: 0.88 }}
                                    style={{ padding: 1, borderRadius: 60 }}
                                 >
                                    <View
                                       style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          backgroundColor: "rgba(0,0,0,0.7)",
                                          paddingHorizontal: 20,
                                          paddingVertical: 18,
                                          borderRadius: 50,
                                       }}
                                    >
                                       <Text className="font-inter700 text-[15px] leading-[18px] text-bs-white uppercase">
                                          CANCEL
                                       </Text>
                                    </View>
                                 </LinearGradient>
                              </Pressable>
                           </View>
                        </View>
                     </View>
                  </BottomSheetView>
               </BottomSheet>


               {/* Logout bottom sheet */}
               <BottomSheet
                  ref={bottomSheetRef2}
                  index={-1}
                  snapPoints={snapPoints}
                  backgroundStyle={{ backgroundColor: "rgba(18, 18, 18, 0.9)" }}
                  handleIndicatorStyle={{ backgroundColor: '#ffffff' }}
                  backdropComponent={(props) => (
                     <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.5} // Adjust overlay darkness
                        pressBehavior="close" // Closes when tapping outside
                     />
                  )}
               >
                  <BottomSheetView className="pt-6 pb-12 px-10">
                     <View className="flex-col items-center">
                        <View className="w-full">
                           <View className="mb-[27px]">
                              <Text className="font-inter700 text-[20px] leading-tight text-bs-white mb-7 text-center">
                                 Logout of your account?
                              </Text>
                              <Text className="font-inter400 text-[15px] leading-tight text-[#D0D0D0] text-center">
                                 Your creations will be preserved
                              </Text>
                              <Text className="font-inter400 text-[15px] leading-tight text-[#D0D0D0] text-center">
                                 when you log back in!
                              </Text>
                           </View>
                           <View className="flex-col gap-6">
                              <Pressable activeOpacity={1}>
                                 <LinearGradient
                                    colors={["#EF56EF", "#57B9FF"]}
                                    start={{ x: 0.23, y: 0.1 }}
                                    end={{ x: 0.95, y: 0.88 }}
                                    style={{ padding: 1, borderRadius: 60 }}
                                 >
                                    <View className="flex-row items-center justify-center px-5 py-[18px] rounded-[50px]"
                                    >
                                       <Text className="font-inter700 text-[15px] leading-[18px] text-bs-white uppercase">
                                          LOGOUT
                                       </Text>
                                    </View>
                                 </LinearGradient>
                              </Pressable>
                              <Pressable
                                 activeOpacity={1}
                                 onPress={closeBottomSheet2}
                              >
                                 <LinearGradient
                                    colors={["#EF56EF", "#57B9FF"]}
                                    start={{ x: 0.23, y: 0.1 }}
                                    end={{ x: 0.95, y: 0.88 }}
                                    style={{ padding: 1, borderRadius: 60 }}
                                 >
                                    <View
                                       style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          backgroundColor: "rgba(0,0,0,0.7)",
                                          paddingHorizontal: 20,
                                          paddingVertical: 18,
                                          borderRadius: 50,
                                       }}
                                    >
                                       <Text className="font-inter700 text-[15px] leading-[18px] text-bs-white uppercase">
                                          CANCEL
                                       </Text>
                                    </View>
                                 </LinearGradient>
                              </Pressable>
                           </View>
                        </View>
                     </View>
                  </BottomSheetView>
               </BottomSheet>
            </GestureHandlerRootView>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};
export default NoCreations;