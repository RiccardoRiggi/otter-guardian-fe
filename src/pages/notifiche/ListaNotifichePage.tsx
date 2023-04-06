import { get } from 'https';
import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getData, getOra } from '../../DateUtil';
import { VoceMenuType } from '../../interfaces/VoceMenuType';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import indirizziIpService from '../../services/IndirizziIpService';
import notificheService from '../../services/NotificheService';
import risorseService from '../../services/RisorseService';
import ruoliService from '../../services/RuoliService';
import vociMenuService from '../../services/VociMenuService';
import SchedaRisorsaValidator from '../../validators/SchedaRisorsaValidator';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';

export default function ListaNotifichePage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();


    let navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [listaNotifiche, setListaNotifiche] = React.useState([]);
    const [paginaNotifiche, setPaginaNotifiche] = React.useState(1);
    const [notificaDaEliminare, setNotificaDaEliminare] = React.useState<any>();


    useEffect(() => {

        if (!ricercaEseguita) {
            getListaNotifiche(paginaNotifiche);
            setRicercaEseguita(true);
        }
    });




    const getListaNotifiche = async (pagina: any) => {

        if (pagina !== 0) {

            await notificheService.getListaNotifiche(utenteLoggato.token, pagina).then(response => {

                if (response.data.length !== 0) {
                    setListaNotifiche(response.data);
                    setPaginaNotifiche(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaNotifiche(response.data);
                    toast.warning("Non sono state trovate notifiche", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }


            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                if (e.response.status === 401) {
                    navigate("/logout");
                }
                //---------------------------------------------
            });
        }
    }

    const eliminaNotifica = async () => {
        await notificheService.eliminaNotifica(utenteLoggato.token, notificaDaEliminare.idNotifica).then(response => {
            console.info(response.data);
            setNotificaDaEliminare(undefined);
            toast.success("Notifica eliminata con successo", {
                position: "top-center",
                autoClose: 5000,
            });
            getListaNotifiche(paginaNotifiche);
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }



    return (
        <Layout>


            {
                <div className="card shadow-lg mx-4 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-bell text-primary fa-1x pe-2 "></i>
                                Gestione notifiche
                            </h3>
                            <Link to="/scheda-notifica" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci notifica</Link>

                        </div>
                    </div>
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            <div className='col-12 '>
                                <div className='table-responsive'>
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead >
                                            <tr>
                                                <th scope="col">Titolo</th>
                                                <th scope="col">Testo</th>
                                                <th scope="col">Data creazione</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(listaNotifiche) && listaNotifiche.map((notifica: any, index: number) =>
                                                    <tr key={index}>
                                                        <th scope="row">{notifica.titolo}</th>
                                                        <td >{notifica.testo}</td>
                                                        <td >{getData(notifica.dataCreazione)} ore {getOra(notifica.dataCreazione)}</td>
                                                        <td className='text-center'><Link to={"/scheda-notifica/" + notifica.idNotifica} className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                                        <td className='text-center'><span onClick={() => setNotificaDaEliminare(notifica)} data-bs-toggle="modal" data-bs-target="#eliminaRisorsa" className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>

                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <small>Pagina {paginaNotifiche}</small>
                            </div>

                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getListaNotifiche(paginaNotifiche - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getListaNotifiche(paginaNotifiche + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                            </div>
                        </div>
                    </div>

                </div>



            }

            <div className="modal fade" id="eliminaRisorsa" data-bs-keyboard="false" aria-labelledby="eliminaRisorsaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eliminaRisorsaLabel">Attenzione!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Vuoi eliminare la notifica <strong>{notificaDaEliminare != undefined ? notificaDaEliminare.titolo : ""}</strong>?<br /> L'operazione è irreversibile!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla<i className="fa-solid fa-undo ps-2"></i></button>
                            <button onClick={eliminaNotifica} type="button" className="btn btn-primary" data-bs-dismiss="modal" >Elimina<i className="fa-solid fa-trash-can ps-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}