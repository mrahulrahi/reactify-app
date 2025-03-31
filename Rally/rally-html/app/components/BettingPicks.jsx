import { View, Text, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const BettingPicksCard = ({ type, logo }) => {

  return (
    <>
      <View className={`rounded-[10px] overflow-hidden ${type == "win" ? 'bg-[#24C865]' : type == "lost" ? 'bg-[#141517]' : 'bg-rally-bg-color'}`}>
        <View className="px-4 py-2.5">
          <View className="flex-row grow items-center justify-between gap-2.5">
            <Text className={`font-lexend300 text-sm leading-tight ${(type === "win" || type === "lost") ? 'text-rally-white uppercase' : 'text-rally-white/70'}`}>
              {type == "win" ? 'Win' : type == "lost" ? 'Lost' : 'Tomorrow 8:00PM'}
            </Text>

            <Text className={`font-lexend300 text-xs leading-tight ${(type === "win" || type === "lost") ? 'text-rally-white' : 'text-rally-white/70'}`}>
              2 days ago
            </Text>
          </View>
        </View>

        <View className="bg-[#1E2024] rounded-t-[10px]">
          <View className="border-b border-white/10 p-4">
            <View className="flex-row justify-start">
              <View className=" bg-[#090A0C] px-2.5 py-1.5 rounded-[20px]">
                <Text className="font-lexend300 text-[14px] leading-tight text-rally-white/60">
                  MoneyLine
                </Text>
              </View>
            </View>


            <View className="flex-row justify-between items-center mt-2.5">
              <View>
                <Text className="font-lexend400 text-[20px] leading-tight text-rally-white">
                  New York Knicks
                </Text>
              </View>

              <View>
                <Text className="font-Roboto600 text-base leading-tight -tracking-[0.02] text-rally-white ">
                  - 590
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2.5 mt-2.5">
              <View className="flex-row items-center">
                <Image
                  className="!w-3.5 !h-3.5"
                  source={logo}
                  resizeMode="contain"
                />
                <Text className="font-lexend400 text-sm leading-tight text-rally-white/70 ml-1.5">
                  NBA
                </Text>
              </View>
              <View className="w-[1px] h-3.5 bg-rally-white/50"></View>
              <Text className="font-lexend300 text-[14px] leading-tight text-rally-white">
                New York Knicks vs Brooklyn Nets
              </Text>
            </View>
          </View>

          <View className="flex-row gap-5 justify-between p-4">
            <View className="flex-row grow basis-0 items-center gap-1.5">
              <Text className="font-lexend300 text-[14px] leading-tight tracking-[-0.02em] text-rally-white/60">
                Risk :
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/images/coin.png")}
                  style={{ width: 19, height: 19, marginRight: 4 }}
                  contentFit="contain"
                  transition={1000}
                />
                <Text className="font-Roboto600 text-[14px] leading-tight tracking-[-0.02em] text-rally-white">+1000</Text>
              </View>
            </View>
            <View className="w-[1px] h-full bg-rally-white/10"></View>
            <View className="flex-row grow basis-0 items-center justify-end gap-1.5">
              <Text className="font-lexend300 text-[14px] leading-tight tracking-[-0.02em] text-rally-white/60">
                Payout :
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/images/coin.png")}
                  style={{ width: 19, height: 19, marginRight: 4 }}
                  contentFit="contain"
                  transition={1000}
                />
                <Text className="font-Roboto600 text-[14px] leading-tight tracking-[-0.02em] text-rally-white">+1000</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between items-center p-4 border-t border-rally-white/10">
            <View className="flex-col">
              <View className="flex-row items-center gap-1.5">
                <Text className="font-lexend300 text-[14px] leading-tight tracking-[-0.02em] text-rally-white/60">Pick ID :</Text>
                <Text className="font-Roboto600 text-[14px] leading-tight tracking-[-0.02em] text-rally-white">4424636</Text>
              </View>
              <Text className="font-lexend200 text-[12px] leading-tight text-rally-white/70 mt-[5px]">Jan 20 2025, 4:30PM</Text>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              className="flex-row items-center gap-2"
            >
              <Feather name="copy" size={20} color="#1E90FF" />
              <Text className="font-lexend400 text-[14px] leading-tight tracking-[-0.02em] text-rally-blue">
                Copy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default BettingPicksCard;
