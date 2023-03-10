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
import SchedaVoceMenuPage from './pages/menu/SchedaVoceMenuPage';
import RecuperoPasswordPage from './pages/RecuperoPasswordPage';
import ListaRisorsePage from './pages/risorse/ListaRisorsePage';
import SchedaRisorsaPage from './pages/risorse/SchedaRisorsaPage';
import ListaRuoliPage from './pages/ruoli/ListaRuoliPage';
import SchedaRuoloPage from './pages/ruoli/SchedaRuoloPage';




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

          <Route
            path="/scheda-voce-menu"
            element={
              <PrivateRoute>
                <SchedaVoceMenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-voce-menu/:idVoceMenu"
            element={
              <PrivateRoute>
                <SchedaVoceMenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-risorse"
            element={
              <PrivateRoute>
                <ListaRisorsePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-risorsa"
            element={
              <PrivateRoute>
                <SchedaRisorsaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-risorsa/:idRisorsa"
            element={
              <PrivateRoute>
                <SchedaRisorsaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-ruoli"
            element={
              <PrivateRoute>
                <ListaRuoliPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-ruolo"
            element={
              <PrivateRoute>
                <SchedaRuoloPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-ruolo/:idTipoRuolo"
            element={
              <PrivateRoute>
                <SchedaRuoloPage />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
