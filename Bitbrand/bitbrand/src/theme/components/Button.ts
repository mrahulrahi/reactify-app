import { ButtonProps } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  borderRadius: 32,
  fontWeight: 700,
});

const sizes = {
  md: defineStyle({
    fontSize: "sm",
    fontWeight: 700,
  }),
};

const variantSolid: ButtonProps = {
  color: "white",
  border: "none",
  _hover: {
    bg: "bitbrand.gray.900",
  },
};

const variantWaitlist: ButtonProps = {
  color: "black",
  border: "1px solid black",
  backgroundColor: "bitbrand.purple.500",
};

const variantBlurred: ButtonProps = {
  backdropFilter: "blur(10px)",
};

const variantTransparent: ButtonProps = {
  backgroundColor: "transparent",
};

const variantGradient: ButtonProps = {
  lineHeight: "15px",
  letterSpacing: "0.07em",
  background:
    "linear-gradient(109.42deg, rgba(179, 134, 253, 0.31) 36.97%, rgba(25, 169, 74, 0.31) 60.89%)",
  textTransform: "uppercase",
};

const variantOutline: ButtonProps = {
  _hover: {
    backgroundColor: "bitbrand.purple.500",
  },
};

const variantGhost: ButtonProps = {
  border: "1px solid",
  borderColor: "transparent",
  _hover: {
    backgroundColor: "transparent",
    borderColor: "bitbrand.gray.800",
  },
};

const variantUnstyled: ButtonProps = {
  fontWeight: "400",
  borderRadius: "none",
};

const variantPurple: ButtonProps = {
  backgroundColor: "bitbrand.purple.500",
  color: "black",
  _hover: {
    backgroundColor: "bitbrand.purple.700",
  },
};

const variantWhite: ButtonProps = {
  backgroundColor: "white",
  _hover: {
    backgroundColor: "bitbrand.purple.500",
  },
};

export const Button = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    solid: variantSolid,
    blurred: variantBlurred,
    transparent: variantTransparent,
    gradient: variantGradient,
    outline: variantOutline,
    ghost: variantGhost,
    unstyled: variantUnstyled,
    purple: variantPurple,
    white: variantWhite,
    waitlist: variantWaitlist,
  },
  defaultProps: { variant: "solid", colorScheme: "bitbrand.black" },
});
