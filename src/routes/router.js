import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import {ROUTES} from "./router.config";
const Router = () => {
  const RouteWithRole = ({ Element }) => {
    return (
      <>
        <Element />
      </>
    );
  };

  return (
    <div>
      <Routes>
      <Route
          exact
          path={ROUTES.Login}
          element={<RouteWithRole Element={Login} />}
        ></Route>
        <Route
          exact
          path={ROUTES.Dashboard}
          element={<RouteWithRole Element={Dashboard} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Router;
