import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TweetFeedPage from './pages/TweetFeedPage';
import NotFound from './pages/NotFound';
import TweetDetails from './pages/TweetDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<TweetFeedPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/feed/:id" element={<TweetDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
