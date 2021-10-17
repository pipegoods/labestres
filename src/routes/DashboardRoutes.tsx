import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export const DashboardRoutes = () => {
   return (
     <Switch>
       <Route exact path="/dashboard" component={Dashboard} />
     </Switch>
   );
}