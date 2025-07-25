import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/add" element={<PropertyForm />} />
        <Route path="/edit/:id" element={<PropertyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
