
import { Stack } from "expo-router";
import useCustomFonts from "@/hooks/useCustomFonts";
import "@/global.css";

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) {
    return null; // Show nothing until fonts are loaded
  }

  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
          height: 100,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false, 
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/signup" options={{ title: "Signup" }} />
      <Stack.Screen name="general/getImageChat" options={{ title: "Get Image Chat" }} />
      <Stack.Screen name="general/ImageGeneration" options={{ title: "Image Generation" }} />
      <Stack.Screen name="general/modify" options={{ title: "Modify" }} />
      <Stack.Screen name="general/myCreationsImages" options={{ title: "My Creations" }} />
      <Stack.Screen name="logo/logoTemplate" options={{ title: "Logo Templates" }} />      
      <Stack.Screen name="logo/logoTemplateSelected" options={{ title: "Logo Template Selected" }} />
      <Stack.Screen name="logo/logoTemplateComplete" options={{ title: "Logo Template Complete" }} />
      <Stack.Screen name="logo/logoCreateVariations" options={{ title: "Logo Create Variations" }} />
    </Stack>
  );
}
