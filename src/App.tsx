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
import LogsPage from './pages/LogsPage';
import ListaVociMenuPage from './pages/menu/ListaVociMenuPage';
import RecuperoPasswordPage from './pages/RecuperoPasswordPage';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="recupero-password" element={<RecuperoPasswordPage />} />

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

          <Route
            path="/logs/:livelloLog"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/logs"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-menu"
            element={
              <PrivateRoute>
                <ListaVociMenuPage />
              </PrivateRoute>
            }
          />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
