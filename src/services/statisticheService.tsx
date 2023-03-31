import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/statistiche.php";

const getStatisticheMetodi = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getStatisticheMetodi"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const statisticheService = {
    getStatisticheMetodi,
   
};
export default statisticheService;