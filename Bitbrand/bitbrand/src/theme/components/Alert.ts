import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, AlertProps } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  alertAnatomy.keys,
);

/** https://github.com/chakra-ui/chakra-ui/issues/7366#issuecomment-1479578696 */

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status } = props;

  const successBase = status === "success" && {
    container: {
      backgroundColor: "black",
      color: "white",
    },
  };

  const warningBase = status === "warning" && {
    container: {
      background: "yellow.50",
      color: "yellow.500",
    },
  };

  const errorBase = status === "error" && {
    container: {
      backgroundColor: "danger.50",
      color: "danger.500",
      button: {
        height: "85%",
      },
    },
  };

  const infoBase = status === "info" && {
    container: {
      background: "primary.50",
      color: "primary.500",
    },
  };

  return {
    ...successBase,
    ...warningBase,
    ...errorBase,
    ...infoBase,
  };
});

export const Alert = defineMultiStyleConfig({
  baseStyle,
});
