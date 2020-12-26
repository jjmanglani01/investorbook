import { Switch, Route } from "react-router-dom";

// Routes
import NotFound from "./not-found/not-found";
import DefaultRoute from "./default/default";
import Company from "./company/company";
import Investor from "./investor/investor";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <DefaultRoute />
      </Route>
      <Route path="/company/:id" exact>
        <Company />
      </Route>
      <Route path="/investor/:id" exact>
        <Investor />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
