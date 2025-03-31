import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Link } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

import EditProfileModal from "./EditProfileModal";
import AvatarSelectionModal from "./AvatarSelectionModal";
import UpdatePasswordModal from "./ChangePasswordModal";
import EditProfileModalPicture from "./EditProfileModalPicture";

export default function Profile() {
  
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isAvatarModalVisible, setAvatarModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="bg-rally-bg-color" style={{ flex: 1 }}>
          <View className=" pt-5 px-5 pb-[12px] mb-[25px]">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl text-white font-lexend400 -tracking-[0.02em]">
                Profile
              </Text>
              <LinearGradient
                colors={["#FFD700", "#FF8C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 2, borderRadius: 60 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    paddingLeft: 8,
                    paddingRight: 12,
                    paddingVertical: 6,
                    borderRadius: 50,
                    gap: 24,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/coin.png")}
                    style={{ width: 24, height: 24, marginRight: 6 }}
                    contentFit="contain"
                    transition={1000}
                  />
                  <Text className="text-white text-base font-Roboto800">
                    1208
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
          <ScrollView className="grow bg-rally-black/50  rounded-t-[20px] pt-5">
            {/* Profile Header  */}
            <View className="pt-[30px] pb-[40px] px-5">
              <View className="w-full">
                <View className="flex-1  items-center justify-center">
                  <View className="w-[132px] h-[132px]  rounded-full  mx-auto mb-5 relative">
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                      }}
                      source={require("../../../assets/images/corey-herwitz.png")}
                      // source={{ uri: profileImage }}
                      contentFit="cover"
                    />
                    <TouchableOpacity
                      onPress={() => setEditModalVisible(true)}
                      activeOpacity={0.8}
                      className="w-[52px] h-[52px] border-[6px] flex items-center justify-center border-[#090A0C] absolute top-[-5px] right-[-20px] bg-[#1E2024] rounded-full"
                    >
                      <Feather name="edit-2" size={24} color="white" />
                    </TouchableOpacity>
                  </View>

                  {/* Edit Profile Modal */}
                  <EditProfileModalPicture
                    visible={isEditModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    onOpenAvatarModal={() => {
                      setEditModalVisible(false);
                      setAvatarModalVisible(true);
                    }}
                  />

                  {/* Avatar Selection Modal */}
                  <AvatarSelectionModal
                    visible={isAvatarModalVisible}
                    onClose={() => setAvatarModalVisible(false)}
                  />
                </View>

                <Text className="text-center text-rally-white text-[24px] font-lexend500 mb-2.5">
                  CoreyHerwitz
                </Text>
                <Text className="text-center text-rally-white/60 text-[14px] leading-[1.4] font-lexend300">
                  CoreyHerwitz@email.com
                </Text>
                <View className="flex-row gap-2.5 justify-center mt-8">
                  {/* Open Update Password Modal */}
                  <TouchableOpacity
                    onPress={() => setPasswordModalVisible(true)}
                  >
                    <Text className="py-4 px-5 font-lexend400 text-[14px] leading-none text-rally-white rounded-full border border-rally-white/60">
                      Change Password
                    </Text>
                  </TouchableOpacity>

                  {/* Open Edit Profile Modal */}
                  <TouchableOpacity
                    onPress={() => setEditProfileModalVisible(true)}
                  >
                    <Text className="py-4 px-5 font-lexend400 text-[14px] leading-none text-rally-white rounded-full border border-rally-white/60">
                      Edit Profile
                    </Text>
                  </TouchableOpacity>

                  {/* Password Modal */}
                  <UpdatePasswordModal
                    visible={isPasswordModalVisible}
                    onClose={() => setPasswordModalVisible(false)}
                  />

                  {/* Edit Profile Modal */}
                  <EditProfileModal
                    visible={isEditProfileModalVisible}
                    onClose={() => setEditProfileModalVisible(false)}
                  />
                </View>
              </View>
            </View>
            {/* Stats Section */}
            <View>
              <View className="flex-row justify-between items-center px-[30px] pt-[28px] pb-[48px] rounded-t-[20px] mb-[-20px] bg-[#1E2024]">
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    10
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Bets Pushed
                  </Text>
                </View>
                <View className="w-[1px] h-[40px] bg-rally-white"></View>
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    2,345
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Coins Spent
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between pt-[28px] pb-[48px] px-[30px] items-center rounded-t-[20px] mb-[-20px] bg-[#151619]">
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    10
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Bets Won
                  </Text>
                </View>
                <View className="w-[1px] h-[40px] bg-rally-white"></View>
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    2
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Bets Lost
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center px-[30px] pt-[28px] pb-[48px] rounded-t-[20px] mb-[-20px] bg-rally-black">
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    3
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Active Bets
                  </Text>
                </View>
                <View className="w-[1px] h-[40px] bg-rally-white"></View>
                <View className="gap-2.5">
                  <Text className="text-white font-Roboto500 text-[32px] tracking-[-0.02em]">
                    12
                  </Text>
                  <Text className="font-lexend400 text-[12px] text-rally-white/60 uppercase">
                    Total Settled Bets
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
