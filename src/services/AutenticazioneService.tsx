import http from "../http-common";

let root = "/autenticazione.php";



const getMetodiAutenticazioneSupportati = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiAutenticazioneSupportati"]]);
    return http.post(root,jsonBody, { params });
}




const autenticazioneService = {
    getMetodiAutenticazioneSupportati,
    

};
export default autenticazioneService;