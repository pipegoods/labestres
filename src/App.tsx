import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme, themeDark } from "./config/ThemeConfig";
import useDarkMode from "./hooks/useDarkMode";
import { AuthProvider } from "./context/AuthProvider";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <ThemeProvider theme={isDarkMode ? themeDark : theme}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={DashboardRoutes} />
            <Route path="/auth" component={AuthRoutes} />
            <Redirect to="/auth" from="/" />
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
