import { View, Text, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import BettingModal from "./BettingModal";
import { LinearGradient } from "expo-linear-gradient";

const BettingCard = ({ quarterNo = "3rd", type }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isSubmitted2, setIsSubmitted2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isSubmitted3, setIsSubmitted3] = useState(false);

  const [focusedButtons, setFocusedButtons] = useState({});

  const toggleFocus = (buttonId) => {
    setFocusedButtons((prev) => ({
      ...prev,
      [buttonId]: !prev[buttonId], // Toggle only the clicked button
    }));
  };

  return (
    <>
      <View className="bg-rally-bg-color rounded-[10px] overflow-hidden">
        <View className="flex-row gap-2.5 px-4 py-[11px]">
          <View className="w-[104px] shrink-0 flex-row gap-1.5 items-center">
            {type == "tomorrow" ? (
              <Text className="font-lexend400 text-xs leading-tight text-rally-white/50 uppercase">
                Tomorrow 8:00PM
              </Text>
            ) : (
              <>
                <View>
                  <Text className="font-lexend500 text-xs leading-tight text-rally-blue uppercase">
                    {quarterNo} Quarter
                  </Text>
                </View>
                <View className="w-4 h-4 bg-rally-blue/20 rounded-full items-center justify-center">
                  <View className="w-2 h-2 bg-rally-blue rounded-full"></View>
                </View>
              </>
            )}
          </View>
          <View className="flex-row grow gap-2.5">
            <View className="grow basis-0">
              <Text className="font-lexend300 text-xs leading-tight text-rally-white text-center">
                Moneyline
              </Text>
            </View>
            <View className="grow basis-0">
              <Text className="font-lexend300 text-xs leading-tight text-rally-white text-center">
                Spread
              </Text>
            </View>
            <View className="grow basis-0">
              <Text className="font-lexend300 text-xs leading-tight text-rally-white text-center">
                Total
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-[#1E2024] rounded-t-[10px]">
          <View className="p-4 pb-2.5 gap-2.5">
            <View className="flex-row gap-2.5 ">
              <View className="shrink-0 flex-row gap-2.5 items-center justify-between">
                <View className="w-[70px]">
                  <Text className="font-lexend400 text-sm leading-tight text-rally-white">
                    Dallas Mavericks
                  </Text>
                </View>
                <View className="w-6 items-center">
                  <Text className="font-lexend400 text-sm leading-tight text-rally-white">
                    11
                  </Text>
                </View>
              </View>
              <View className="flex-row grow gap-2.5">
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    toggleFocus(1);
                    setModalVisible(true);
                  }}
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                >
                  {focusedButtons[1] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                        zIndex: -1,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      -560
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                  activeOpacity={1}
                  onPress={() => {
                    toggleFocus(2);
                    setModalVisible2(true);
                  }}
                >
                  {focusedButtons[2] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto400 text-sm leading-[1.15] text-rally-white/50">
                      +6
                    </Text>
                  </View>
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      -115.0
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                  onPress={() => {
                    toggleFocus(3);
                    setModalVisible3(true);
                  }}
                >
                  {focusedButtons[3] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto400 text-sm leading-[1.15] text-rally-white/50">
                      218
                    </Text>
                  </View>
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      -120.5
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row gap-2.5">
              <View className="shrink-0 flex-row gap-2.5 items-center justify-between">
                <View className="w-[70px]">
                  <Text className="font-lexend400 text-sm leading-tight text-rally-white">
                    Charlotte Hornets
                  </Text>
                </View>
                <View className="w-6 items-center">
                  <Text className="font-lexend400 text-sm leading-tight text-rally-white">
                    64
                  </Text>
                </View>
              </View>
              <View className="flex-row grow gap-2.5">
                <TouchableOpacity
                  activeOpacity={1}
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                  onPress={() => {
                    toggleFocus(4);
                    setModalVisible(true);
                  }}
                >
                  {focusedButtons[4] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                        zIndex: -1,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      +380
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                  activeOpacity={4}
                  onPress={() => {
                    toggleFocus(5);
                    setModalVisible(true);
                  }}
                >
                  {focusedButtons[5] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto400 text-sm leading-[1.15] text-rally-white/50">
                      +6
                    </Text>
                  </View>
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      -115.0
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  className="relative grow basis-0 gap-2.5 items-center justify-center px-3 py-2 bg-rally-bg-color rounded-[10px] overflow-hidden"
                  onPress={() => {
                    toggleFocus(6);
                    setModalVisible(true);
                  }}
                >
                  {focusedButtons[6] && (
                    <LinearGradient
                      colors={["#FFD700", "#FF7700"]}
                      start={{ x: 0.2, y: -0.2 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View>
                    <Text className="font-Roboto400 text-sm leading-[1.15] text-rally-white/50">
                      218
                    </Text>
                  </View>
                  <View>
                    <Text className="font-Roboto600 text-sm leading-[1.15] text-rally-white">
                      -120.5
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center px-4 py-2 border-t border-rally-white/10">
            <View className="flex-row items-center">
              <Image
                className="!w-3.5 !h-3.5"
                source={require("../../assets/images/nba-icon.png")}
                resizeMode="contain"
              />
              <Text className="font-lexend400 text-sm leading-tight text-rally-white/70 ml-1.5">
                NBA
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              className="flex-row items-center gap-2"
            >
              <Text className="font-lexend300 text-[13px] leading-tight text-rally-white/70">
                View Details
              </Text>
              <Feather
                name="chevron-right"
                size={18}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Moneyline Modal Start */}
      <BettingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}

        visible2={modalVisible2}
        onClose2={() => setModalVisible2(false)}
        isSubmitted2={isSubmitted2}
        setIsSubmitted2={setIsSubmitted2}

        visible3={modalVisible3}
        onClose3={() => setModalVisible3(false)}
        isSubmitted3={isSubmitted3}
        setIsSubmitted3={setIsSubmitted3}
      />
      {/* Moneyline Modal End*/}
    </>
  );
};

export default BettingCard;
