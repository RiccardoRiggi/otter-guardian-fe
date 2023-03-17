import { toast } from 'react-toastify';




export function verificaErroreAutorizzazione(status: any) {

    let esito: boolean = false;

    if (status === 403) {
        esito=true;
        toast.error("Privilegi insufficienti per richiamare la risorsa richiesta!", {
            position: "top-center",
            autoClose: 5000,
        });
    }

    return esito;
}


