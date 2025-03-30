
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold,} from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold,Inter_700Bold} from '@expo-google-fonts/inter';

/**
 * Custom hook to load fonts
 * Includes both Google Fonts and custom local fonts.
 */
export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    // Google Fonts
    Poppins_400Regular,
    Poppins_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Custom Local Font
    Polaris: require('../assets/fonts/Polaris.otf'),
  });

  return fontsLoaded;
}
