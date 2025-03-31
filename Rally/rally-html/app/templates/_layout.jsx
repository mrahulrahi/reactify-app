import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="bonus" options={{headerShown:false}} />
      <Stack.Screen name="bonus-claimed" options={{headerShown:false}} />
      <Stack.Screen name="bonus1" options={{headerShown:false}} />
      <Stack.Screen name="bonus1-claimed" options={{headerShown:false}} />
      <Stack.Screen name="toaster" options={{headerShown:false}} />
      <Stack.Screen name="404" options={{headerShown:false}} />
      <Stack.Screen name="500" options={{headerShown:false}} />
      <Stack.Screen name="summary" options={{headerShown:false}} />
      <Stack.Screen name="game-lines" options={{headerShown:false}} />
      <Stack.Screen name="accordion" options={{headerShown:false}} />
    </Stack>
  );
}
