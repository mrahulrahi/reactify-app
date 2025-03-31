import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import {Lexend_200ExtraLight, Lexend_300Light,Lexend_400Regular,Lexend_500Medium,Lexend_600SemiBold} from "@expo-google-fonts/lexend";
import "../global.css";
// Prevent splash screen from hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_800ExtraBold: require("../assets/fonts/Roboto-ExtraBold.ttf"),
    Roboto_600SemiBold: require("../assets/fonts/Roboto-SemiBold.ttf"),
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
