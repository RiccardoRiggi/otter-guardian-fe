import React from "react";

export const initialState = {
    
}

export const utenteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_UTENTE':
            return {
                initialState
            }
        case 'FETCH_SESSIONE':
            return {
                sessione: action.sessione
            }
        default:
            return state;
    }
}