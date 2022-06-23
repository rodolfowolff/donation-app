import { Dimensions } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;

export type IColorsTypes =
  | "primary"
  | "black"
  | "white"
  | "gray"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "bg";
export type IFontsSizesTypes =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";
export type IFontsWeightsTypes = "light" | "regular" | "bold";

export const light = {
  colors: {
    primary: "#2d2d2d",
    black: "#202020",
    white: "#FFFFFF",
    gray: "#696969",
    danger: "#FF0000",
    success: "#00FF00",
    warning: "#FFD700",
    info: "#0000FF",
    bg: "#FBFBFB",
    stroke: "#E0E0E0",
  },
  fonts: {
    sizes: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 18,
      xxlarge: 24,
    },
    weights: {
      light: "300",
      regular: "500",
      bold: "700",
    },
  },
  screens: {
    width: WIDTH,
    height: HEIGHT,
  },
};
