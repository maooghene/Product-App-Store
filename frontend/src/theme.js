import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088cc", // primary
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#003f5e",
    },
    accent: {
      50: "#fff5f5",
      100: "#fed7d7",
      200: "#feb2b2",
      300: "#fc8181",
      400: "#f56565",
      500: "#e53e3e", // danger/red
      600: "#c53030",
      700: "#9b2c2c",
      800: "#822727",
      900: "#63171b",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        rounded: "lg",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.600", transform: "scale(1.05)" },
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
          _hover: { bg: "brand.50" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          rounded: "md",
          borderColor: "gray.300",
          _focus: { borderColor: "brand.500", boxShadow: "0 0 0 1px #0088cc" },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "gray.700",
      },
    },
    Box: {
      baseStyle: {
        rounded: "xl",
        shadow: "md",
      },
    },
  },
});

export default theme;
