import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2076D2",
    },
    secondary: {
      // 基調 => DEEP PURPLE
      main: "#673AB7",
      dark: "#512DA8",
      light: "#D1C4E9",
    },
    // text: {
    //   primary: "#FF0000",
    //   secondary: "#FF0000"
    // }
  },
});

export default theme;
