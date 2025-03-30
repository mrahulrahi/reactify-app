import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys,
);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {},
  list: {
    backgroundColor: "rgba(200, 200, 200, 0.5)",
    borderRadius: "20px",
    border: "none",
    backdropFilter: "auto",
    backdropBlur: "12px",
  },
  item: {
    backgroundColor: "transparent",
    paddingX: "16px",
    marginY: "4px",
    _hover: {
      backgroundColor: "transparent",
    },
    _focus: {
      backgroundColor: "transparent",
    },
  },
  groupTitle: {},
  command: {},
  divider: {
    borderColor: "blackAlpha.400",
  },
});

const variantUppercase = defineStyle({
  item: {
    textTransform: "uppercase",
  },
});

const variants = {
  uppercase: variantUppercase,
};

// export the base styles in the component theme
export const Menu = defineMultiStyleConfig({ baseStyle, variants });
