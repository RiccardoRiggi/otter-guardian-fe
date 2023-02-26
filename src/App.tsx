import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import ImpostazioniPage from './pages/ImpostazioniPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />




          <Route
            path=""
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/impostazioni"
            element={
              <PrivateRoute>
                <ImpostazioniPage />
              </PrivateRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
