import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys,
);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "bitbrand.gray.50",
    padding: 4,
    boxShadow: "none",
    borderRadius: { base: 20, lg: 40 },
  },
  header: {
    paddingBottom: 4,
  },
  body: {
    paddingTop: 4,
  },
  footer: {
    paddingTop: 4,
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      width: "420px",
    },
  }),
};

const variants = {
  image: definePartsStyle({
    container: { padding: 0 },
    header: {
      padding: 0,
      borderTopRadius: "inherit",
      overflow: "hidden",
    },
    body: { padding: 0 },
    footer: {},
  }),
};

export const Card = defineMultiStyleConfig({ baseStyle, sizes, variants });
