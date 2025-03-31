import React from 'react';
import { View, FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Card from "@/components/Card";
import InputBar from "@/components/InputBar";


const items = [
  {
    title: "Social Graphic",
    description:
      "A magnificent light show with pulsing flares oscillating down, ultra realistic, 8k camera",
    image: require("@/assets/images/social-graphic.jpeg"),
  },
  {
    title: "Style Transfer",
    description:
      "A magnificent light show with pulsing flares oscillating down, ultra realistic, 8k camera",
    image: require("@/assets/images/style-transfer.jpeg"),
  },
  {
    title: "Avatar Portrait",
    description:
      "A magnificent light show with pulsing flares oscillating down, ultra realistic, 8k camera",
    image: require("@/assets/images/avatar-portrait.png"),
  },
  
];
// bg-bs-black
const Signup2Screen = () => {

  

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-bs-black">
        <View
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          className="flex-1"
        >
          <FlatList 
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                description={item.description}
                image={item.image}
              />
            )}
            contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 16, gap: 22,flexGrow: 1, justifyContent: "center"}}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <InputBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Signup2Screen;
