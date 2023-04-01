import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/dispositivoFisico.php";

const getDispositiviFisici = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getDispositiviFisici"],["pagina",pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const generaIdentificativoDispositivoFisico = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "generaIdentificativoDispositivoFisico"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const isDispositivoAbilitato = (token: any,idDispositivoFisico: any) => {
    const params = new URLSearchParams([["nomeMetodo", "isDispositivoAbilitato"],["idDispositivoFisico",idDispositivoFisico]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getListaDispositiviFisici = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getListaDispositiviFisici"],["pagina",pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const rimuoviDispositivoFisico = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "rimuoviDispositivoFisico"]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const dispositiviFisiciService = {
    getDispositiviFisici,
    generaIdentificativoDispositivoFisico,
    isDispositivoAbilitato,
    getListaDispositiviFisici,
    rimuoviDispositivoFisico

};
export default dispositiviFisiciService;