import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Agenda",
      },
    },
  },
  colors: {
    brand: {
      300: "#4970F8",
      400: "#434FBC",
      500: "#3A59C6",
    },
  },
});
