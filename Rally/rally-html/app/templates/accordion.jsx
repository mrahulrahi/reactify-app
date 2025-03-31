import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

const { height } = Dimensions.get("window"); // Get device screen height

const BottomAccordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const [betAmount, setBetAmount] = useState("");

  const [risk, setRisk] = useState(1000);
  const [payout, setPayout] = useState(2000);

  const toggleAccordion = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // Must be false for height animations
    }).start();
    setExpanded(!expanded);
  };

  // Content sliding animation
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 494],
  });


  const handleRiskChange = (value) => setRisk(value);
  const handlePayoutChange = (value) => setPayout(value);
  return (
    <>
      {expanded && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleAccordion}
          style={styles.overlay}
        />
      )}

      <View style={styles.accordionContainer}>
        {/* Header (Always Fixed at Bottom) */}
        {expanded && (
          <View className="flex-row justify-center mb-[30px]">
            <TouchableOpacity activeOpacity={1}
              className="px-5 py-3 flex-row items-center bg-[#1E2024] rounded-[14px]"
            >
              <Image
                source={require("../../assets/images/share-icon.png")}
                style={{ width: 24, height: 24, marginRight: 16 }}
                contentFit="contain"
                transition={1000}
              />
              <Text className="font-Roboto400 text-[14px] leading-[16px] tracking-[0.02em] text-rally-white">
                Share Bet with Friends
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity activeOpacity={1} onPress={toggleAccordion}>
          <LinearGradient
            colors={["#ffbc00", "#ffa300"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          >
            <View className="flex-row justify-between items-center px-5 pt-2.5 pb-[13px]">
              <Text className="text-rally-white text-[20px] font-lexend500 capitalize">
                My Picks
              </Text>

              {expanded ? <Feather name="chevron-down" size={24} color="white" /> : <Feather name="chevron-up" size={24} color="white" />}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Content (Slides Up When Expanded) */}
        <Animated.View style={{ backgroundColor: "#1E2024", height: animatedHeight }}>
          <View className="flex-row justify-between items-center border-b border-white/10 px-5 pt-[14px] pb-[10px]">
            <View>
              <View className="flex-row gap-1">
                <Text className="font-lexend400 text-[14px] text-rally-white/50">Balance :</Text>
                <Text className="text-rally-white" >1208</Text>
                <Text className="font-lexend300 text-[14px] text-rally-white/50" >Rally Coins</Text>
              </View>
            </View>
            <View>
              <LinearGradient
                colors={["#FFD700", "#FF8C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 0, borderRadius: 60 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    paddingLeft: 3,
                    paddingRight: 19,
                    paddingVertical: 3,
                    borderRadius: 50,
                    width: 53,
                  }}
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    style={{ width: 26, height: 26 }}
                    contentFit="contain"
                    transition={1000}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
          <View className="flex-row justify-between items-start border-b border-white/10 px-5 py-[20px]">
            <View>
              <Text className="font-lexend400 text-[20px] leading-tight text-rally-white">
                New York Knicks
              </Text>
              <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/80 mt-[5px]">
                MONEYLINE
              </Text>
              <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60 mt-[5px]">
                New York Knicks vs Brooklyn Nets
              </Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Text className="text-rally-white font-lexend600 font-semibold text-xl leading-tight -tracking-[0.02]">
                - 590
              </Text>
              <TouchableOpacity activeOpacity={1}>
                <Image
                  source={require("../../assets/images/trash.png")}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                  transition={1000}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="pt-5 pb-[50px] px-5">
            <View>
              {/* Risk & Payout Inputs */}
              <View className="flex-row gap-5 justify-between">
                <View className="grow basis-0">
                  <Text className="text-rally-white text-[14px] font-lexend300 tracking-[-0.02em] mb-1">
                    Risk
                  </Text>
                  <View className="flex-row items-center bg-transparent rounded-[10px] px-2.5 h-[44px] border border-white/10">
                    <TextInput
                      className="flex-grow w-[50px] text-rally-white font-Roboto600 text-[14px] tracking-[-0.02em]"
                      value={risk.toString()}
                      keyboardType="numeric"
                      onChangeText={handleRiskChange}
                    />
                    <Image
                      source={require("../../assets/images/coin.png")}
                      style={{ width: 20, height: 20, marginLeft: 8 }}
                      contentFit="contain"
                      transition={1000}
                    />
                  </View>
                </View>
                <View className="grow basis-0">
                  <Text className="text-rally-white text-[14px] font-lexend300 tracking-[-0.02em] mb-1">
                    Payout
                  </Text>
                  <LinearGradient
                    colors={["#FFD700", "#FF8C00"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 1, borderRadius: 10 }}
                  >
                    <View className="flex-row items-center bg-black/70 rounded-[10px] h-[42px] px-2.5">
                      <TextInput
                        className="flex-grow w-[50px] text-rally-white font-Roboto600 text-[14px] tracking-[-0.02em]"
                        value={payout.toString()}
                        keyboardType="numeric"
                        onChangeText={handlePayoutChange}
                      />
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 20, height: 20, marginLeft: 8 }}
                        contentFit="contain"
                        transition={1000}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </View>
              {/* Quick Amount Buttons */}
              <View className="flex-row justify-between mt-5 gap-2.5">
                {[1000, 2000, 5000].map((amount) => (
                  <TouchableOpacity activeOpacity={1}
                    key={amount}
                    className="bg-rally-bg-color px-5 py-[13px] rounded-[10px] grow basis-0"
                    onPress={() => setRisk(risk + amount)}
                  >
                    <Text className="text-rally-white text-[14px] font-Roboto600 tracking-[-0.02em] w-full text-center">
                      +{amount}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity activeOpacity={1}
                  className="bg-rally-bg-color px-5 py-[13px] rounded-[10px] grow basis-0"
                  onPress={() => setRisk(99999)}
                >
                  <Text className="text-rally-white text-[14px] font-Roboto600 tracking-[-0.02em] w-full text-center">MAX</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-5">
              {/* Submit Button */}
              <LinearGradient
                colors={["#ffbc00", "#ffa300"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 10, marginTop: 20, }}
              >
                <TouchableOpacity activeOpacity={1}
                  className="p-4 w-full  flex items-center"
                  onPress={() => console.log("Bet Submitted")}
                >
                  <Text className="text-rally-white text-[14px] font-Roboto800">
                    SUBMIT BET
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              {/* Swap Coins Option */}
              <Text className="font-lexend300 text-[14px] text-rally-white/60 text-center mt-5">
                1,000 coins towards your play-through
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

const App = () => {
  return (
    <View style={styles.screen}>

      {/* Fixed Bottom Accordion */}
      <BottomAccordion title="Click to Expand" content="This is the expanded content." />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    zIndex: 10, // Ensure it's above everything else
  },
  accordionContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 20, // Ensure it's above the overlay
  },
});

export default App;
