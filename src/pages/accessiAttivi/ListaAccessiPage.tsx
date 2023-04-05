import { get } from 'https';
import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData, getOra } from '../../DateUtil';
import { verificaErroreAutorizzazione } from '../../ErrorsUtil';
import { VoceMenuType } from '../../interfaces/VoceMenuType';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import gestioneAccessiService from '../../services/AccessiService';
import dispositiviFisiciService from '../../services/DispositiviFisiciService';
import risorseService from '../../services/RisorseService';
import ruoliService from '../../services/RuoliService';
import utentiService from '../../services/UtentiService';
import vociMenuService from '../../services/VociMenuService';

export default function ListaAccessiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [accessoDaEliminare, setAccessoDaEliminare] = React.useState<any>();



    const [accessi, setAccessi] = React.useState([]);
    const [paginaAccesso, setPaginaAccesso] = React.useState(1);





    const getListaAccessi = async (pagina: any) => {

        if (pagina !== 0) {

            await gestioneAccessiService.getListaAccessi(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setAccessi(response.data);
                    setPaginaAccesso(pagina);
                } else if (paginaAccesso == 1 && response.data.length === 0) {
                    setAccessi(response.data);
                    toast.warning("Non sono stati trovati accessi attivi", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
                console.error(e);

                if (e.response.status === 401) {
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/login");
                } else {
                    if (!verificaErroreAutorizzazione(e.response.status)) {
                        toast.error(e.response.data.descrizione, {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    }
                }

            });
        }
    }

    const terminaAccesso = async () => {
        await gestioneAccessiService.terminaAccesso(utenteLoggato.token, { token: accessoDaEliminare.token }).then(response => {
            console.info(response.data);
            toast.success("Utente disconnesso con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setAccessoDaEliminare(undefined);
            getListaAccessi(paginaAccesso);


        }).catch(e => {
            console.error(e);
            toast.error(e.response.data.descrizione, {
                position: "top-center",
                autoClose: 5000,
            });
            if (e.response.status === 401) {
                navigate("/login");
            }
        });
    }




    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getListaAccessi(paginaAccesso);
        }
    }, []);


    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-circle-nodes text-primary fa-1x pe-2 "></i>
                            Lista accessi attivi
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Utente</th>
                                            <th scope="col">Data login</th>
                                            <th scope="col">Data ultimo utilizzo</th>
                                            <th scope="col">Data logout</th>
                                            <th scope="col">Termina</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(accessi) && accessi.map((accesso: any, index: number) =>
                                                <tr key={index}>
                                                    <th scope="row">{accesso.cognome} {accesso.nome}</th>
                                                    <td>{getData(accesso.dataInizioValidita)} {getOra(accesso.dataInizioValidita)}</td>
                                                    <td>{getData(accesso.dataUltimoUtilizzo)} {getOra(accesso.dataUltimoUtilizzo)}</td>
                                                    <td>{getData(accesso.dataFineValidita)} {getOra(accesso.dataFineValidita)}</td>
                                                    <td className='text-center'>
                                                        {accesso.dataFineValidita === null && <span onClick={() => setAccessoDaEliminare(accesso)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span>}
                                                    </td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaAccesso}</small>
                        </div>
                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getListaAccessi(paginaAccesso - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getListaAccessi(paginaAccesso + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="eliminaRisorsa" data-bs-keyboard="false" aria-labelledby="eliminaRisorsaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaRisorsaLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi disconnettere l'utente <strong>{accessoDaEliminare != undefined ? accessoDaEliminare.nome + "" + accessoDaEliminare.cognome : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={terminaAccesso} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Disconnetti<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}