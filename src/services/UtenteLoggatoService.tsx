import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/utenteLoggato.php";

const getUtenteLoggato = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getUtenteLoggato"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const invalidaToken = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "invalidaToken"]]);
    const headers = {
        token: token,
    }

    let config = { params, headers };

    return http.put(root,null,config);
}

const verificaAutenticazione = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "verificaAutenticazione"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getStoricoAccessi = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getStoricoAccessi"],["pagina",pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const generaCodiciBackup = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "generaCodiciBackup"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const utenteLoggatoService = {
    getUtenteLoggato,
    invalidaToken,
    verificaAutenticazione,
    getStoricoAccessi,
    generaCodiciBackup
};
export default utenteLoggatoService;