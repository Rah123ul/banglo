import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Founder from './pages/Founder';
import Science from './pages/Science';
import Spirituality from './pages/Spirituality';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Overview from './pages/Overview';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router basename="/banglo" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/science" element={<Science />} />
          <Route path="/spirituality" element={<Spirituality />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;