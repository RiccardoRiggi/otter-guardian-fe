import React from "react";

export const resetUtenteAction  = (utente) => ({
    type: 'RESET_UTENTE',
    utente
})

export const fetchSessioneAction  = (sessione) => ({
    type: 'FETCH_SESSIONE',
    sessione
})


