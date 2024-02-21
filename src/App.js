import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FeedPage from './pages/FeedPage/FeedPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/feed/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
