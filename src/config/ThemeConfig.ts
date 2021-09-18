import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#525CA3",
      dark: "#2B3370",
      light: "#BCCDEB",
    },
    secondary: {
      main: "#CF483E",
      dark: "#D55B52",
      light: "#EB5C47",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  }
});

export const themeDark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00bcd4",
        dark: "#008394",
        light: "#33c9dc",
      },
      secondary: {
        main: "#CF483E",
        dark: "#D55B52",
        light: "#EB5C47",
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    }
  });