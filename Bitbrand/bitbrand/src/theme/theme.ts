import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { styles } from "./styles";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { breakpoints } from "./breakpoints";
import * as components from "./components";


const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
export const theme = extendTheme({
  config,
  breakpoints,
  styles,
  colors,
  fonts,
  components: {
    ...components,
  },
  shadows: {
    outline: "0 0 0 2px #B386FD",
  },
});
