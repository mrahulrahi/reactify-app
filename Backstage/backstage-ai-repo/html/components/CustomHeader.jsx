import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function CustomHeader({ showBackTitle = true,  showTitle = true,  title = "Title" }) {

  const navigation = useNavigation();
  return (
    <View className="h-20 pl-4 pr-[46px] flex-row items-center justify-between bg-black">     
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}
          className=" items-center flex-row gap-3 justify-center flex-shrink-0">
        <FontAwesome6 name="chevron-left" size={26} color="white" />
        {showBackTitle && (
          <Text style={{ color: "white", marginLeft: 5, fontSize: 16 }}>Back</Text>
        )}
      </TouchableOpacity>     
      {showTitle && (
        <Text className="text-center grow" style={{ color: "white", fontSize: 18, fontWeight: "bold"}}>
          {title}
        </Text>
      )}
    </View>
  );
}
