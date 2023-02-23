import http from "../http-common";

let root = "/autenticazione.php";



const getMetodiAutenticazioneSupportati = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiAutenticazioneSupportati"]]);
    return http.post(root,jsonBody, { params });
}

const effettuaAutenticazione = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "effettuaAutenticazione"]]);
    return http.post(root,jsonBody, { params });
}

const confermaAutenticazione = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "confermaAutenticazione"]]);
    return http.post(root,jsonBody, { params });
}

const generaQrCode = () => {
    const params = new URLSearchParams([["nomeMetodo", "generaQrCode"]]);
    return http.get(root, { params });
}

const recuperaSessioneDaQrCode = (idQrCode: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaSessioneDaQrCode"],["idQrCode",idQrCode]]);
    return http.get(root, { params });
}

const recuperaSessioneDaLogin = (idLogin: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaSessioneDaLogin"],["idLogin",idLogin]]);
    return http.get(root, { params });
}


const autenticazioneService = {
    getMetodiAutenticazioneSupportati,
    generaQrCode,
    recuperaSessioneDaQrCode,
    effettuaAutenticazione,
    recuperaSessioneDaLogin,
    confermaAutenticazione

};
export default autenticazioneService;