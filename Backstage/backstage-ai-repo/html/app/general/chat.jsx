import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import InputBar from "@/components/InputBar";

const botImage = require("@/assets/images/profile-img.png");
const images = {
  "img-1": require("@/assets/images/img-1.jpg"),
  "img-2": require("@/assets/images/img-2.jpg"),
  "img-3": require("@/assets/images/img-3.jpg"),
};

const Chatscreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      img: "",
      text: "Hello! How can I help you today?",
      sender: "bot",
    },
    {
      id: "2",
      img: "",
      text: "Hello! I would like to know about javascript?",
      sender: "user",
    },
    { id: "3", img: "", text: "What is React?", sender: "user" },
    {
      id: "4",
      img: "",
      text: "React is a JavaScript library for building user interfaces.",
      sender: "bot",
    },
    {
      id: "5",
      img: "img-2",
      text: "Can you tell me more about hooks?",
      sender: "user",
    },
    {
      id: "6",
      img: "img-3",
      text: "Sure! Hooks are functions that let you use state and other React features without writing a class.",
      sender: "bot",
    },
    { id: "7", img: "img-1", text: "", sender: "bot" },
  ]);
  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={`flex-row grow-0 ${
          isUser ? "justify-end" : "gap-2 justify-start"
        } !mb-10`}
      >
        {!isUser && (
          <Image
            className="!w-6 !h-6 shrink-0 rounded-full"
            source={botImage}
            resizeMode="cover"
          />
        )}

        <View
          className={`max-w-[80%] h-full gap-3 grow basis-0 ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          {item.img && (
            <View className="w-full grow aspect-square">
              <Image
                className="!w-full !h-full flex-1 rounded-xl"
                source={images[item.img]}
                resizeMode="cover"
              />
            </View>
          )}
          {item.text && (
            <Text className="font-inter400 text-base text-bs-silver-sand bg-[#23292B] border border-[#4D5658] rounded-2xl p-3">
              {item.text}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} className="bg-bs-bg-color">
        <View className="flex-1 justify-center">
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <InputBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  flatListContent: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    gap: 0,
  },
});
export default Chatscreen;
