import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { authenticated, loadingAuthState } = useContext(AuthContext);
  if (loadingAuthState) {
    console.log("LoadingAuthState: ", loadingAuthState);
    return (
      <div>
        <CssBaseline />
        <Typography variant="h1" component="div" gutterBottom>
          Cargando contenido!!!
        </Typography>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/auth/login", state: { prevPath: rest.path } }} />
        )
      }
    />
  );
}
export default PrivateRoute;