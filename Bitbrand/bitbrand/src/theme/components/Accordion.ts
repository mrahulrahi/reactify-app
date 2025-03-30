import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys,
);

const baseStyle = definePartsStyle({
  root: { borderColor: "blackAlpha.900", borderBottom: "0.5px solid" },
  container: {
    border: "none",
  },
  button: {
    borderTop: "0.5px solid",
    fontWeight: 600,
    paddingY: 4,
    _hover: {
      background: "transparent",
    },
  },
  panel: { border: "none" },
  icon: {
    border: "none",
  },
});

export const Accordion = defineMultiStyleConfig({ baseStyle });
