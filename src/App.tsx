import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home.page';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="antialiased text-stone-800 bg-soft-white font-sans selection:bg-stone-200 selection:text-stone-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

