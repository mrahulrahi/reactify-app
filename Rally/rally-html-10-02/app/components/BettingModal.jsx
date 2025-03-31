import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";

export default function BettingModal({
  type = "moneyline",
  visible,
  onClose,
  isSubmitted,
  setIsSubmitted,
  visible2,
  onClose2,
  isSubmitted2,
  setIsSubmitted2,
  visible3,
  onClose3,
  isSubmitted3,
  setIsSubmitted3,
}) {
  const [betAmount, setBetAmount] = useState("");

  const [risk, setRisk] = useState(1000);
  const [payout, setPayout] = useState(2000);

  const handleRiskChange = (value) => setRisk(value);
  const handlePayoutChange = (value) => setPayout(value);

  // Handles submission and opens the "Pick Submitted" modal
  const handleSubmit = () => {
    setIsSubmitted(true); // Changes the state of isSubmitted in the parent component
  };

  const handleSubmit2 = () => {
    setIsSubmitted2(true); // Changes the state of isSubmitted in the parent component
  };

  const handleSubmit3 = () => {
    setIsSubmitted3(true); // Changes the state of isSubmitted in the parent component
  };


  return (
    <>
      {/* BETTING MODAL */}
      <Modal
        visible={visible && !isSubmitted}
        onRequestClose={onClose}
        transparent={true}
        animationType="none"
      >
        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
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
                <TouchableOpacity onPress={onClose}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
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
                <TouchableOpacity>
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
                    <TouchableOpacity
                      key={amount}
                      className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
                      onPress={() => setRisk(risk + amount)}
                    >
                      <Text className="text-rally-white text-[14px] font-Roboto600 tracking-[-0.02em] w-full text-center">
                        +{amount}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
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
                  <TouchableOpacity
                    className="p-4 w-full  flex items-center"
                    onPress={handleSubmit}
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
          </View>
        </View>
      </Modal>

      {/* PICK SUBMITTED MODAL */}
      <Modal
        visible={isSubmitted}
        onRequestClose={() => {
          setIsSubmitted(false);
          onClose();
        }}
        transparent={true}
        animationType="none"
      >


        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="mb-[30px]">
            <TouchableOpacity
              className="px-5 py-3 w-full flex-row items-center bg-[#1E2024] rounded-[14px]"
              onPress={handleSubmit}
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
            </TouchableOpacity></View>
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
            <LinearGradient
              colors={["#ffbc00", "#ffa300"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
              <View className="flex-row justify-between items-center px-5 pt-2.5 pb-[13px]">
                <Text className="font-lexend500 text-[20px] text-rally-white capitalize">
                  Pick Submitted
                </Text>
                <TouchableOpacity onPress={() => setIsSubmitted(false)}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View className="flex-row justify-between items-center border-b border-white/10 px-5 pt-[17px] pb-[13px]">
              <View className=" w-full flex-row flex-wrap items-center gap-2.5">
                <View className="flex-row items-center shrink-0">
                  <Image source={require("../../assets/images/nba-icon.png")} style={{ width: 14, height: 14 }}
                    contentFit="contain"
                    transition={1000} />
                  <Text className="font-lexend400 text-[14px] text-rally-white/70" style={{ marginLeft: 5, }}>NBA</Text>
                </View>
                <View className="w-[1px] h-3.5 shrink-0 bg-rally-white/50"></View>
                <Text className="grow font-lexend300 text-[14px] leading-tight text-rally-white">Jan 26, 2025 at 12:00pm</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-start border-b border-rally-white/10 px-5 py-[20px]">
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
              </View>
            </View>
            <View className="pt-5 pb-[50px] px-5">
              <View>
                {/* Risk & Payout Inputs */}
                <View className="flex-row gap-5 justify-between">
                  <View className="flex-row grow basis-0 items-center gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Risk :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                  <View className="w-[1px] h-full bg-rally-white/10"></View>
                  <View className="flex-row grow basis-0 items-center justify-end gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Payout :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mt-10">
                {/* Submit Button */}
                <TouchableOpacity
                  className="p-4 w-full flex items-center bg-rally-bg-color rounded-[10px]"
                  onPress={handleSubmit}
                >
                  <Text className="font-Roboto800 text-[14px] text-rally-white uppercase">
                    Copy To Snap Coins
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>


      {/* BETTING MODAL 2 */}
      <Modal
        visible={visible2 && !isSubmitted2}
        onRequestClose={onClose2}
        transparent={true}
        animationType="none"
      >
        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
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
                <TouchableOpacity onPress={onClose2}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
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
                  New York Knicks <Text className="ms-1.5">+6</Text>
                </Text>
                <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/80 mt-[5px]">
                  POINT SPREAD
                </Text>
                <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60 mt-[5px]">
                  New York Knicks vs Brooklyn Nets
                </Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Text className="text-rally-white font-lexend600 font-semibold text-xl leading-tight -tracking-[0.02]">
                  - 590
                </Text>
                <TouchableOpacity>
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
                    <TouchableOpacity
                      key={amount}
                      className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
                      onPress={() => setRisk(risk + amount)}
                    >
                      <Text className="text-rally-white text-[14px] font-Roboto600 tracking-[-0.02em] w-full text-center">
                        +{amount}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
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
                  <TouchableOpacity
                    className="p-4 w-full  flex items-center"
                    onPress={handleSubmit2}
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
          </View>
        </View>
      </Modal>

      {/* PICK SUBMITTED MODAL 2 */}
      <Modal
        visible={isSubmitted2}
        onRequestClose={() => {
          setIsSubmitted2(false);
          onClose2();
        }}
        transparent={true}
        animationType="none"
      >

        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="mb-[30px]">
            <TouchableOpacity
              className="px-5 py-3 w-full flex-row items-center bg-[#1E2024] rounded-[14px]"
              onPress={handleSubmit2}
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
            </TouchableOpacity></View>
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
            <LinearGradient
              colors={["#ffbc00", "#ffa300"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
              <View className="flex-row justify-between items-center px-5 pt-2.5 pb-[13px]">
                <Text className="font-lexend500 text-[20px] text-rally-white capitalize">
                  Pick Submitted
                </Text>
                <TouchableOpacity onPress={() => setIsSubmitted2(false)}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View className="flex-row justify-between items-center border-b border-white/10 px-5 pt-[17px] pb-[13px]">
              <View className=" w-full flex-row flex-wrap items-center gap-2.5">
                <View className="flex-row items-center shrink-0">
                  <Image source={require("../../assets/images/nba-icon.png")} style={{ width: 14, height: 14 }}
                    contentFit="contain"
                    transition={1000} />
                  <Text className="font-lexend400 text-[14px] text-rally-white/70" style={{ marginLeft: 5, }}>NBA</Text>
                </View>
                <View className="w-[1px] h-3.5 shrink-0 bg-rally-white/50"></View>
                <Text className="grow font-lexend300 text-[14px] leading-tight text-rally-white">Today at 5:00pm</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-start border-b border-rally-white/10 px-5 py-[20px]">
              <View>
                <Text className="font-lexend400 text-[20px] leading-tight text-rally-white">
                  New York Knicks <Text className="ms-1.5">+6</Text>
                </Text>
                <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/80 mt-[5px]">
                  POINT SPREAD
                </Text>
                <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60 mt-[5px]">
                  New York Knicks vs Brooklyn Nets
                </Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Text className="text-rally-white font-lexend600 font-semibold text-xl leading-tight -tracking-[0.02]">
                  - 590
                </Text>
              </View>
            </View>
            <View className="pt-5 pb-[50px] px-5">
              <View>
                {/* Risk & Payout Inputs */}
                <View className="flex-row gap-5 justify-between">
                  <View className="flex-row grow basis-0 items-center gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Risk :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                  <View className="w-[1px] h-full bg-rally-white/10"></View>
                  <View className="flex-row grow basis-0 items-center justify-end gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Payout :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mt-10">
                {/* Submit Button */}
                <TouchableOpacity
                  className="p-4 w-full flex items-center bg-rally-bg-color rounded-[10px]"
                  onPress={handleSubmit2}
                >
                  <Text className="font-Roboto800 text-[14px] text-rally-white uppercase">
                    Copy To Snap Coins
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>


      {/* BETTING MODAL 3 */}
      <Modal
        visible={visible3 && !isSubmitted3}
        onRequestClose={onClose3}
        transparent={true}
        animationType="none"
      >
        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
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
                <TouchableOpacity onPress={onClose3}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
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
            <View className="border-b border-white/10 px-5 py-[20px]">
              <Text className="font-lexend300 text-[14px] leading-tight text-rally-white mb-[5px]">
                New York Knicks
              </Text>
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-lexend400 text-[20px] leading-tight text-rally-white">
                    Over 47
                  </Text>
                  <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/80 mt-[5px]">
                    TOTAL SCORE
                  </Text>
                  <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60 mt-[5px]">
                    New York Knicks vs Brooklyn Nets
                  </Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Text className="text-rally-white font-lexend600 font-semibold text-xl leading-tight -tracking-[0.02]">
                    - 115
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/images/trash.png")}
                      style={{ width: 24, height: 24 }}
                      contentFit="contain"
                      transition={1000}
                    />
                  </TouchableOpacity>
                </View>
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
                    <TouchableOpacity
                      key={amount}
                      className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
                      onPress={() => setRisk(risk + amount)}
                    >
                      <Text className="text-rally-white text-[14px] font-Roboto600 tracking-[-0.02em] w-full text-center">
                        +{amount}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    className="bg-[#121418] px-5 py-[13px] rounded-[10px] grow basis-0"
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
                  <TouchableOpacity
                    className="p-4 w-full  flex items-center"
                    onPress={handleSubmit3}
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
          </View>
        </View>
      </Modal>

      {/* PICK SUBMITTED MODAL 3 */}
      <Modal
        visible={isSubmitted3}
        onRequestClose={() => {
          setIsSubmitted3(false);
          onClose3();
        }}
        transparent={true}
        animationType="none"
      >

        <View className="flex-1 justify-end items-center bg-[#121418] bg-opacity-70">
          <View className="mb-[30px]">
            <TouchableOpacity
              className="px-5 py-3 w-full flex-row items-center bg-[#1E2024] rounded-[14px]"
              onPress={handleSubmit3}
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
            </TouchableOpacity></View>
          <View className="w-full bg-modal-bg-color rounded-t-lg overflow-hidden">
            {/* Header */}
            <LinearGradient
              colors={["#ffbc00", "#ffa300"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
              <View className="flex-row justify-between items-center px-5 pt-2.5 pb-[13px]">
                <Text className="font-lexend500 text-[20px] text-rally-white capitalize">
                  Pick Submitted
                </Text>
                <TouchableOpacity onPress={() => setIsSubmitted3(false)}>
                  <Feather name="chevron-down" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View className="flex-row justify-between items-center border-b border-white/10 px-5 pt-[17px] pb-[13px]">
              <View className=" w-full flex-row flex-wrap items-center gap-2.5">
                <View className="flex-row items-center shrink-0">
                  <Image source={require("../../assets/images/nba-icon.png")} style={{ width: 14, height: 14 }}
                    contentFit="contain"
                    transition={1000} />
                  <Text className="font-lexend400 text-[14px] text-rally-white/70" style={{ marginLeft: 5, }}>NBA</Text>
                </View>
                <View className="w-[1px] h-3.5 shrink-0 bg-rally-white/50"></View>
                <Text className="grow font-lexend300 text-[14px] leading-tight text-rally-white">Today at 5:00pm</Text>
              </View>
            </View>
            <View className="border-b border-rally-white/10 px-5 py-[20px]">
              <Text className="font-lexend300 text-[14px] leading-tight text-rally-white mb-[5px]">
                New York Knicks
              </Text>
              <View className="flex-row justify-between items-start">
                <View>
                  <View className="flex-row items-center gap-3">
                    <View className="w-4 h-4 bg-rally-blue/20 rounded-full items-center justify-center">
                      <View className="w-2 h-2 bg-rally-blue rounded-full"></View>
                    </View>
                    <Text className="font-lexend400 text-[20px] leading-tight text-rally-white">Over 47</Text>
                  </View>
                  <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/80 mt-[5px]">
                    TOTAL SCORE
                  </Text>
                  <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60 mt-[5px]">
                    New York Knicks vs Brooklyn Nets
                  </Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Text className="text-rally-white font-lexend600 font-semibold text-xl leading-tight -tracking-[0.02]">
                    - 115
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-5 pb-[50px] px-5">
              <View>
                {/* Risk & Payout Inputs */}
                <View className="flex-row gap-5 justify-between">
                  <View className="flex-row grow basis-0 items-center gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Risk :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                  <View className="w-[1px] h-full bg-rally-white/10"></View>
                  <View className="flex-row grow basis-0 items-center justify-end gap-1.5">
                    <Text className="font-lexend300 text-[14px] tracking-[-0.02em] text-rally-white/60">
                      Payout :
                    </Text>
                    <View className="flex-row items-center">
                      <Image
                        source={require("../../assets/images/coin.png")}
                        style={{ width: 19, height: 19, marginRight: 4 }}
                        contentFit="contain"
                        transition={1000}
                      />
                      <Text className="font-Roboto600 text-[14px] leading-none tracking-[-0.02em] text-rally-white">+1000</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mt-10">
                {/* Submit Button */}
                <TouchableOpacity
                  className="p-4 w-full flex items-center bg-rally-bg-color rounded-[10px]"
                  onPress={handleSubmit3}
                >
                  <Text className="font-Roboto800 text-[14px] text-rally-white uppercase">
                    Copy To Snap Coins
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
