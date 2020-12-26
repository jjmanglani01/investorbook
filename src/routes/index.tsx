import { Switch, Route } from "react-router-dom";

// Routes
import NotFound from "./not-found/not-found";
import DefaultRoute from "./default/default";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <DefaultRoute />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
