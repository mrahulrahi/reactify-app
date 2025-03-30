import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys,
);

const baseStyle = definePartsStyle({
  addon: {},
  field: {},
  element: {},
});

const variantOutline = {
  field: {
    border: "1px solid",
    borderColor: "bitbrand.gray.800",
    borderRadius: 5,
    _hover: {
      borderColor: "bitbrand.gray.600",
    },
  },
};

const variantReadOnly = {
  field: {
    border: "1px solid",
    borderColor: "bitbrand.gray.600",
    borderRadius: 5,
    color: "bitbrand.gray.900",
    _hover: {
      borderColor: "bitbrand.gray.600",
    },
  },
};

const variantWhite = {
  field: {
    border: "1px solid",
    borderColor: "white",
    borderRadius: 5,
    color: "white",
    backgroundColor: "transparent",
    _hover: {
      borderColor: "bitbrand.gray.600",
    },
  },
};

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants: { outline: variantOutline, readonly: variantReadOnly, white: variantWhite },
  defaultProps: {
    // For some reason Chakra doesn't type this prop input properly,
    // so we `as any` here to silence the TS error
    focusBorderColor: "bitbrand.gray.900",
  } as any,
});
