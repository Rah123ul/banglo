import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ChatBot from './components/ChatBot';
import Index from './pages/Index';
import Founder from './pages/Founder';
import Science from './pages/Science';
import Spirituality from './pages/Spirituality';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Overview from './pages/Overview';
import AdminPanel from './pages/AdminPanel';
import { useSwipeNavigation } from './hooks/useSwipeNavigation';
import SwipeIndicator from './components/SwipeIndicator';
import ToastMessage from './components/ToastMessage';

function App() {
  const { swipeState, toast } = useSwipeNavigation();

  return (
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

      <ChatBot />

      <SwipeIndicator active={swipeState.active} side={swipeState.side} progress={swipeState.progress} />
      <ToastMessage show={toast.show} message={toast.message} />

    </div>
  );
}

export default App;