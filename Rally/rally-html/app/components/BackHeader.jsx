import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const BackHeader = () => {
    const router = useRouter();

    return (
        <TouchableOpacity activeOpacity={1} className="flex-row gap-2 items-center" onPress={() => router.back()} >
            <Ionicons name="arrow-back-outline" size={15} color="white" />
            <Text className="font-lexend300 text-sm leading-tight text-rally-white">Back</Text>
        </TouchableOpacity>
    )
}

export default BackHeader