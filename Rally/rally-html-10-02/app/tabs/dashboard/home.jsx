import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BettingPicksCard from "../../components/BettingPicks";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} className="bg-rally-bg-color ">
        <ScrollView
          style={{ flex: 1 }}
          className=" bg-rally-black/50 rounded-t-[20px] p-5"
        >
          <View>
            <Text className="font-lexend400 text-xl leading-tight text-rally-white mb-5">
              Home
            </Text>

            <View className="gap-5">
              <BettingPicksCard logo={require("../../../assets/images/nba-logo.png")}/>
              <BettingPicksCard type="win" logo={require("../../../assets/images/nba-icon.png")}/>
              <BettingPicksCard type="lost" logo={require("../../../assets/images/nfl-icon.png")}/>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
