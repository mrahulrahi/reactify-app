import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-rally-bg-color grow">
      <View className=" pt-5 px-5 pb-[12px] mb-5">
          <Text className="text-2xl text-white font-lexend font-normal -tracking-[0.02em]">
            pROFILE
          </Text>
        </View>
        <ScrollView className="grow bg-black/50 rounded-t-[20px] p-5">
          <Text className="font-lexend text-[12px]">Regular Lexend Font</Text>
          <Text className="font-lexend font-light text-[12px]">
            Light Lexend Font
          </Text>
          <Text className="font-lexend font-medium text-[12px]">
            Medium Lexend Font
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
