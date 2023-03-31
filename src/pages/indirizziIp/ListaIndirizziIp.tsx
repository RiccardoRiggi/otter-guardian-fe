import { get } from 'https';
import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { VoceMenuType } from '../../interfaces/VoceMenuType';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction } from '../../modules/feedback/actions';
import comboService from '../../services/ComboService';
import indirizziIpService from '../../services/IndirizziIpService';
import risorseService from '../../services/RisorseService';
import ruoliService from '../../services/RuoliService';
import vociMenuService from '../../services/VociMenuService';
import SchedaRisorsaValidator from '../../validators/SchedaRisorsaValidator';
import SchedaRuoloValidator from '../../validators/SchedaRuoloValidator';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';

export default function ListaIndirizziIp() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();





    let navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);




    useEffect(() => {

        if (!ricercaEseguita) {
            getIndirizziIp(paginaIndirizziIp);
            setRicercaEseguita(true);
        }
    });

    const [ListaIndirizziIp, setListaIndirizziIp] = React.useState([]);
    const [paginaIndirizziIp, setPaginaIndirizziIp] = React.useState(1);


    const getIndirizziIp = async (pagina: any) => {

        if (pagina !== 0) {

            await indirizziIpService.getIndirizziIp(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setListaIndirizziIp(response.data);
                    setPaginaIndirizziIp(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setListaIndirizziIp(response.data);
                    toast.warning("Non sono state trovate risorse", {
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
                }
            });
        }
    }

    const azzeraContatoreAlert = async (indirizzoIp: any) => {
        await indirizziIpService.azzeraContatoreAlert(utenteLoggato.token, { indirizzoIp: indirizzoIp }).then(response => {
            console.info(response.data);
            getIndirizziIp(paginaIndirizziIp);
        }).catch(e => {
            console.error(e);
            if (e.response.status === 401) {
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
                navigate("/login");
            }
        });
    }

    const cambiaAbilitazioneIndirizzoIp = async (dataBlocco: any, indirizzoIp: any) => {
        if (dataBlocco === null) {
            await indirizziIpService.bloccaIndirizzoIp(utenteLoggato.token, { indirizzoIp: indirizzoIp }).then(response => {
                console.info(response.data);
                getIndirizziIp(paginaIndirizziIp);
            }).catch(e => {
                console.error(e);
                if (e.response.status === 401) {
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/login");
                }
            });
        } else {
            await indirizziIpService.sbloccaIndirizzoIp(utenteLoggato.token, { indirizzoIp: indirizzoIp }).then(response => {
                getIndirizziIp(paginaIndirizziIp);
            }).catch(e => {
                console.error(e);
                if (e.response.status === 401) {
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/login");
                }
            });
        }
    }

    return (
        <Layout>


            {
                <div className="card shadow-lg mx-4 mt-3">
                    <div className="card-header pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                                Lista indirizzi ip
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
                                                <th scope="col">Ip</th>
                                                <th scope="col">N. alert</th>
                                                <th scope="col">Reset alert</th>
                                                <th scope="col">Bloccato</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(ListaIndirizziIp) && ListaIndirizziIp.map((indirizzoIp: any, index: number) =>
                                                    <tr key={index}>
                                                        <th className='text-center' scope="row">{indirizzoIp.indirizzoIp}</th>
                                                        <td className='text-center'>{indirizzoIp.contatoreAlert}</td>
                                                        <td><span className='btn btn-primary' onClick={() => azzeraContatoreAlert(indirizzoIp.indirizzoIp)}><i className="fa-solid fa-undo"></i></span></td>
                                                        <td className='text-center'><div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={indirizzoIp.dataBlocco !== null} onClick={(e) => { cambiaAbilitazioneIndirizzoIp(indirizzoIp.dataBlocco, indirizzoIp.indirizzoIp) }} />
                                                        </div></td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-6 text-end pt-2'>
                                <span onClick={() => getIndirizziIp(paginaIndirizziIp - 1)} className='btn btn-primary'>Precedente</span>
                            </div>
                            <div className='col-6 text-start pt-2'>
                                <span onClick={() => getIndirizziIp(paginaIndirizziIp + 1)} className='btn btn-primary'>Successivo</span>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </Layout >
    );

}