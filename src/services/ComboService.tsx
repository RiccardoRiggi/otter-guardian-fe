import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/combo.php";

const getComboVociMenu = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboVociMenu"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}



const comboService = {
    getComboVociMenu
};
export default comboService;