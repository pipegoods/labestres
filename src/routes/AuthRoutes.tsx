import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
export const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Redirect to="/auth/login" from="/auth" />
    </Switch>
  );
};
