import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup"
import { AuthProvider, AuthContext } from "../contexts/auth";
import React, { useContext } from 'react'

const AppRoutes = () => {
  const Private = ({ children }) => {
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
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes