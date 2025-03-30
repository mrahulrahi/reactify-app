import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderColor: "black",
});

const thick = defineStyle({
  borderWidth: "5px",
  borderStyle: "solid",
  borderRadius: 10,
});

const thin = defineStyle({
  borderWidth: "0.5px",
  borderStyle: "solid",
});

export const Divider = defineStyleConfig({
  baseStyle,
  variants: { thick, thin },
});
