import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundPage() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-800">404 - Page Not Found</Text>
      <Link href="/signup" className="mt-4 text-blue-500 underline">
        Go back to Home
      </Link>
    </View>
  );
}
