import { get } from 'https';
import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData } from '../../DateUtil';
import { verificaErroreAutorizzazione } from '../../ErrorsUtil';
import { VoceMenuType } from '../../interfaces/VoceMenuType';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import dispositiviFisiciService from '../../services/DispositiviFisiciService';
import risorseService from '../../services/RisorseService';
import ruoliService from '../../services/RuoliService';
import utentiService from '../../services/UtentiService';
import vociMenuService from '../../services/VociMenuService';

export default function ListaDispositiviFisiciPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [dispositivoDaEliminare, setDispositivoDaEliminare] = React.useState<any>();



    const [dispositivi, setDispositivi] = React.useState([]);
    const [paginaDispositivo, setPaginaDispositivo] = React.useState(1);





    const getListaDispositiviFisici = async (pagina: any) => {

        if (pagina !== 0) {

            await dispositiviFisiciService.getListaDispositiviFisici(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setDispositivi(response.data);
                    setPaginaDispositivo(pagina);
                } else if (paginaDispositivo == 1 && response.data.length === 0) {
                    setPaginaDispositivo(response.data);
                    toast.warning("Non sono stati trovati utenti", {
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

    const rimuoviDispositivoFisico = async () => {
        await dispositiviFisiciService.rimuoviDispositivoFisico(utenteLoggato.token, {idDispositivoFisico: dispositivoDaEliminare.idDispositivoFisico}).then(response => {
            console.info(response.data);
            toast.success("Dispositivo rimosso con successo!", {
                position: "top-center",
                autoClose: 5000,
            });
            setDispositivoDaEliminare(undefined);
            getListaDispositiviFisici(paginaDispositivo);


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
            getListaDispositiviFisici(paginaDispositivo);
        }
    }, []);


    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-mobile-screen text-primary fa-1x pe-2 "></i>
                            Lista dispositivi fisici abilitati
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
                                            <th scope="col">Nome dispositivo</th>
                                            <th scope="col">Proprietario</th>
                                            <th scope="col">Data abilitazione</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(dispositivi) && dispositivi.map((dispositivo: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{dispositivo.nomeDispositivo}</th>
                                                    <td>{dispositivo.cognome} {dispositivo.nome}</td>
                                                    <td>{getData(dispositivo.dataAbilitazione)}</td>
                                                    <td className='text-center'><span onClick={() => setDispositivoDaEliminare(dispositivo)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getListaDispositiviFisici(paginaDispositivo - 1)} className='btn btn-primary'>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getListaDispositiviFisici(paginaDispositivo + 1)} className='btn btn-primary'>Successivo</span>
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
                            Vuoi disabilitare il dispositivo di <strong>{dispositivoDaEliminare != undefined ? dispositivoDaEliminare.nome + "" + dispositivoDaEliminare.cognome : ""}</strong> chiamato <strong>{dispositivoDaEliminare != undefined ? dispositivoDaEliminare.nomeDispositivo : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                            <button onClick={rimuoviDispositivoFisico} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Disabilita</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}