import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FeedPage from './pages/FeedPage/FeedPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import { AuthProvider } from './contexts/auth-context';
import { ProtectedRoute } from './components/organisms/Routes/ProtectedRoute';
import { PublicRoute } from './components/organisms/Routes/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed/:id"
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
