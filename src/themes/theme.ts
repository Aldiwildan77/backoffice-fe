import { extendTheme } from "@chakra-ui/react";
import Input from "./Input/Input";

const theme = extendTheme({
  colors: {
    bodyBackgroundColor: "#E8E8E8",
    bodyBackgroundSecondaryColor: "#6B7378",
    primaryColor: "#000000",
    secondaryColor: "#6B1822",
    thirdColor: "#5C2B22",
    forthColor: "#D4B15F",
  },
  styles: {
    global: {
      body: {
        bg: "secondaryColor",
      },
    },
  },
  components: {
    Input,
  },
});

export default theme;
