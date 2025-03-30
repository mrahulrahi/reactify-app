import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  container: {},
  item: { fontSize: 14, color: "bitbrand.gray.900" },
  icon: {},
}));

const variantLegal = definePartsStyle((props) => {
  const LEGAL_FONT_SIZE = "12px";
  const LEGAL_LINE_HEIGHT = "20px";
  const LEGAL_FONT_WEIGHT = 400;

  return {
    container: {
      color: "bitbrand.black.500",
      fontSize: LEGAL_FONT_SIZE,
      lineHeight: LEGAL_LINE_HEIGHT,
      fontWeight: LEGAL_FONT_WEIGHT,
    },
    item: {
      paddingX: 2,
      paddingY: 2,
      color: "bitbrand.black.500",
      fontSize: LEGAL_FONT_SIZE,
      lineHeight: LEGAL_LINE_HEIGHT,
      fontWeight: LEGAL_FONT_WEIGHT,

      // borderBottom: "1px solid",
      // "&::marker": {
      //   color: "red",
      // },
    },
    icon: {},
  };
});

export const List = defineMultiStyleConfig({
  baseStyle,
  variants: {
    legal: variantLegal,
  },
});
