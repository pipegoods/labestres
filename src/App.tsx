import React from "react";
import { ThemeProvider } from "@mui/material";
import Dashboard from "./components/Dashboard";
import { theme, themeDark } from "./config/ThemeConfig";
import useDarkMode from "./hooks/useDarkMode";


function App() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <ThemeProvider theme={isDarkMode ? themeDark : theme}>
      <Dashboard changeTheme={toggle} />
    </ThemeProvider>
  );
}

export default App;
