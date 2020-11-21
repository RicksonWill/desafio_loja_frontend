import React from "react";
import Produtos from "./pages/produtos";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Produtos} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
