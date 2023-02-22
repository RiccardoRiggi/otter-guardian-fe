
import axios from "axios";
export default axios.create({
    baseURL: "http://127.0.0.1/Github-Repository/php-rest-authenticator/rest",
    headers: {
        "Content-type": "application/json",
    }
});

