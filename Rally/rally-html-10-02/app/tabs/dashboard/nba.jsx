import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BettingCard from "../../components/BettingOdds";


export default function NBA() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} className="bg-rally-bg-color">
        <ScrollView style={{ flex: 1 }} className=" bg-rally-black/50 rounded-t-[20px] p-5">
          <View>
            <Text className="font-lexend400 text-xl leading-tight text-rally-white mb-5">
              Matches
            </Text>
          </View>
          <View className="gap-5">
            <BettingCard quarterNo="3rd" />
            <BettingCard quarterNo="4th" />
            <BettingCard type="tomorrow" />
            <BettingCard type="tomorrow" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

