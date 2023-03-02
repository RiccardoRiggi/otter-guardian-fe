import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/log.php";

const getLogs = (token: any, pagina: any, livelloLog: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getLogs"],["pagina", pagina],["livelloLog", livelloLog.toUpperCase()]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}



const logService = {
    getLogs
};
export default logService;