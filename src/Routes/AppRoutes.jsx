import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from '../components/pages/Home/Home';
import LoginPage from '../components/pages/Login/Login';
import Signup from '../components/pages/Signup/Signup';
import TweetPage from '../components/pages/Tweet/Tweet';
import { AuthContext, AuthProvider } from "../contexts/auth";
import TweetDetailProvider from "../contexts/tweetDetail";
import TweetTimelineProvider from "../contexts/tweetsTimeline";
import { setUserLocalStorage } from '../contexts/util';
import { AxiosInterceptor } from '../services/api';

const AppRoutes = () => {
  function Private({ children }) {
    const { token } = useContext(AuthContext)

    if (!token) {
      setUserLocalStorage(null)
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={
            <Private>
              <TweetTimelineProvider>
                <AxiosInterceptor>
                  <HomePage />
                </AxiosInterceptor>
              </TweetTimelineProvider>
            </Private>
          } />
          <Route exact path="/tweet/:id" element={<Private>
            <TweetDetailProvider>
              <AxiosInterceptor>
                <TweetPage />
              </AxiosInterceptor>
            </TweetDetailProvider>
          </Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes