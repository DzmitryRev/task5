import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export let darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: "light",
  },
});
