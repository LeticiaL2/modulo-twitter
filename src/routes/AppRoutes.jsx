import React from "react";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";

import HomePage from "../pages/home-page/home-page";
import LoginPage from "../pages/login-page/login-page";
import DetailsPage from "../pages/details-page/details-page";
import SignupPage from "../pages/signup-page/signup-page";

import TimeLineProvider from "../contexts/tweetsHomePageContext";
import TweetsDetailsProvider from "../contexts/tweetsDetailsContext";
import HelpPage from "../pages/help-page/help-page";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routers>
      <Routes>
        <Route exact path="login" element={<LoginPage />} />

        <Route exact path="signup" element={<SignupPage />} />

        <Route exact path="help" element={<HelpPage />} />

        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <TimeLineProvider>
                <HomePage />
              </TimeLineProvider>
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="tweets/:id/detalhes"
          element={
            <PrivateRoute>
              <TweetsDetailsProvider>
                <DetailsPage />
              </TweetsDetailsProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </Routers>
  );
};

export default AppRoutes;
