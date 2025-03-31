import { View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BettingPicksCard from "../../components/BettingPicks";
export default function Active() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-rally-black grow">
        <ScrollView className="grow bg-rally-black/50 rounded-t-[20px] p-5">
          <View className="gap-5">
            <BettingPicksCard type="win" logo={require("../../../assets/images/nba-icon.png")}/> 
            <BettingPicksCard type="lost" logo={require("../../../assets/images/nfl-icon.png")}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


