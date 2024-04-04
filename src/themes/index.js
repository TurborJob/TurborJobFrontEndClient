import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/open-sans';
import '@fontsource-variable/raleway';

const config = {
  initialColorMode: "white",
  useSystemColorMode: false,
};

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Poppins', sans-serif`,
};

const components = {
  
};

const theme = extendTheme({
  config,
  fonts,
  components
});

export default theme;
