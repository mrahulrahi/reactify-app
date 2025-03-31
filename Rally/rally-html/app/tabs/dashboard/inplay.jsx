import { ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import NoRecordFound from "../../components/NoRecordFound";
export default function InPlay() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-rally-black grow">
        <ScrollView className="grow bg-rally-black/50 rounded-t-[20px] p-5">          
          <NoRecordFound
            imageSource={require("../../../assets/images/empty-icon1.png")}
            title="No Games Found!"
            subtitle="Please, check back later"
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
