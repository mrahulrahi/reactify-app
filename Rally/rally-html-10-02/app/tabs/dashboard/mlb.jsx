import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Mlb() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-rally-black grow">
        <ScrollView  className="grow bg-black/50 rounded-t-[20px] p-5">
          <View >
          <Text className="text-blue-600 font-lexend font-light text-4xl">Mlb</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
