import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ModulePage from './components/ModulePage';
import CreateModulePage from './components/CreateModulePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/create-module" element={<CreateModulePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
