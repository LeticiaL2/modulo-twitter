import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../components/pages/Home/Home'
import LoginPage from '../components/pages/Login/Login'
import Signup from '../components/pages/Signup/Signup'
import TweetPage from '../components/pages/Tweet/Tweet'
import { AuthProvider, AuthContext } from "../contexts/auth";
import React, { useContext } from 'react'

const AppRoutes = () => {
  function Private({ children }) {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div>Loading...</div>
    }
    
    if (!authenticated) {
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
          <Route exact path="/" element={<Private><HomePage /></Private>} />
          <Route exact path="/tweet/:id" element={<Private><TweetPage /></Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes