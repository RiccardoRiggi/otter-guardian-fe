import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/gestioneAccessi.php";

const getListaAccessiAttivi = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaAccessiAttivi"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const terminaAccesso = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "terminaAccesso"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const accessiAttiviService = {
    getListaAccessiAttivi,
    terminaAccesso
};
export default accessiAttiviService;