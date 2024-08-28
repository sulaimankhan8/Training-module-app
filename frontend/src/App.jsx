import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import CreateModulePage from './components/CreateModulePage';
import ModulePage from './components/ModulePage';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-module" element={<CreateModulePage />} />
        <Route path="/modules/:id" element={<ModulePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
