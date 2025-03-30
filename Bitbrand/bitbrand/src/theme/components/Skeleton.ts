import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const bitbrand = defineStyle({
  _light: {
    [$startColor.variable]: "colors.blackAlpha.100",
    [$endColor.variable]: "colors.blackAlpha.400",
  },
  _dark: {
    [$startColor.variable]: "colors.blackAlpha.800",
    [$endColor.variable]: "colors.blackAlpha.600",
  },

  borderRadius: { base: 20, lg: 40 },
});

export const Skeleton = defineStyleConfig({
  variants: { bitbrand },
  defaultProps: {
    variant: "bitbrand",
  },
});
