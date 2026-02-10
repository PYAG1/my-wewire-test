import { Dimensions } from "react-native";

export const sizes = {
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get("screen").height,
  marginSize: {
    small: 15,
    medium: 20,
    large: 35,
  },
  fontSize: [10, 12, 14, 16, 18, 20, 24],
};
