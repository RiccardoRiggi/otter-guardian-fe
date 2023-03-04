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
import risorseService from '../../services/RisorseService';
import vociMenuService from '../../services/VociMenuService';
import SchedaRisorsaValidator from '../../validators/SchedaRisorsaValidator';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';

export default function SchedaRisorsaPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();



    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [idRisorsa, setIdRisorsa] = React.useState<any>("");
    const [nomeMetodo, setNomeMetodo] = React.useState<any>("");
    const [descrizione, setDescrizione] = React.useState<any>("");


    let navigate = useNavigate();


    const getRisorsa = async () => {
        dispatch(fetchIsLoadingAction(true));
        await risorseService.getRisorsa(utenteLoggato.token, params.idRisorsa).then(response => {
            console.info(response.data);

            setIdRisorsa(response.data.idRisorsa);
            setNomeMetodo(response.data.nomeMetodo);
            setDescrizione(response.data.descrizione);

            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }



    const submitForm = async () => {

        let jsonBody = {
            idRisorsa: idRisorsa,
            nomeMetodo: nomeMetodo,
            descrizione: descrizione
        }


        let formsErrorTmp = SchedaRisorsaValidator(jsonBody);
        setFormErrors(formsErrorTmp);

        console.info("JSONBODY: ", jsonBody);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idRisorsa === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await risorseService.inserisciRisorsa(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Risorsa inserita con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/scheda-risorsa/" + idRisorsa);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                dispatch(fetchIsLoadingAction(true));
                await risorseService.modificaRisorsa(utenteLoggato.token, jsonBody, params.idRisorsa).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Risorsa aggiornata con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }).catch(e => {
                    console.error(e);

                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }



    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idRisorsa !== undefined) {
                getRisorsa();
            }
            setRicercaEseguita(true);
        }
    });


    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-bars text-primary fa-1x pe-2 "></i>
                            {params.idRisorsa === undefined ? "Aggiungi" : "Modifica"} risorsa
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idRisorsa === undefined ? "Inserisci risorsa" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Identificativo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input disabled={params.idRisorsa !== undefined} name='idRisorsa' type={"text"} onChange={(e: any) => setIdRisorsa(e.currentTarget.value)} className={formErrors?.idRisorsa != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci l'identificativo..."} value={idRisorsa} />

                            <small className='text-danger'>{formErrors?.idRisorsa}</small>
                        </div>


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome del metodo<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nomeMetodo' type={"text"} onChange={(e: any) => setNomeMetodo(e.currentTarget.value)} className={formErrors?.nomeMetodo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome del metodo"} value={nomeMetodo} />

                            <small className='text-danger'>{formErrors?.nomeMetodo}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Descrizione<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='descrizione' type={"text"} onChange={(e: any) => setDescrizione(e.currentTarget.value)} className={formErrors?.descrizione != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una descrizione..."} value={descrizione} />

                            <small className='text-danger'>{formErrors?.descrizione}</small>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    );

}