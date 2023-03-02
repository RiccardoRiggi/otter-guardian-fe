import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/vociMenu.php";

const getVociMenuPerUtente = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVociMenuPerUtente"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getVociMenu = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getVociMenu"],["pagina",pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const vociMenuService = {
    getVociMenuPerUtente,
    getVociMenu
};
export default vociMenuService;