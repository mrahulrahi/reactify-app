import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  // By default, all Text should be 14px
  fontSize: "14px",
});

const variantLegal = defineStyle({
  fontSize: "12px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "bitbrand.black.500",
});

export const Text = defineStyleConfig({
  baseStyle,
  variants: {
    legal: variantLegal,
  },
});
