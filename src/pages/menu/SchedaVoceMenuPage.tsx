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
import vociMenuService from '../../services/VociMenuService';
import SchedaVoceMenuValidator from '../../validators/SchedaVoceMenuValidator';

export default function SchedaVoceMenuPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const dispatch = useDispatch();
    const params = useParams();
    let [voceMenu, setVoceMenu] = React.useState<any>(Object);

    let [idVoceMenuPadre, setIdVoceMenuPadre] = React.useState<any>(null);

    const aggiornaVoceMenuPadre = (event: any) => {
        voceMenu.idVoceMenuPadre = event.target.value;
        setIdVoceMenuPadre(event.target.value);
    }


    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    let navigate = useNavigate();

    const [listaVociMenu, setListaVociMenu] = React.useState([]);

    const getVoceMenu = async () => {
        dispatch(fetchIsLoadingAction(true));
        await vociMenuService.getVoceMenu(utenteLoggato.token, params.idVoceMenu).then(response => {
            console.info(response.data);
            setVoceMenu(response.data);
            setIdVoceMenuPadre(response.data.idVoceMenuPadre);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const aggiornaStato = (event: any) => {
        let valore = event.target.value;
        let nomeCampo = event.target.name;
        voceMenu[nomeCampo] = valore;
        formErrors[nomeCampo] = undefined;
        setVoceMenu(voceMenu);
    };

    const submitForm = async () => {


        let formsErrorTmp = SchedaVoceMenuValidator(voceMenu);
        setFormErrors(formsErrorTmp);

        console.info("JSONBODY: ",voceMenu);

        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idVoceMenu === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await vociMenuService.inserisciVoceMenu(utenteLoggato.token, voceMenu).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Utente registrato con successo!"));
                    navigate("/scheda-voce-menu/" + response.data);
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            } else {
                dispatch(fetchIsLoadingAction(true));
                await vociMenuService.modificaVoceMenu(utenteLoggato.token, voceMenu, params.idVoceMenu).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    dispatch(fetchTestoSuccessAction("Utente aggiornato con successo!"));
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchTestoDangerAction("Errore durante il salvataggio!"));
                    dispatch(fetchIsLoadingAction(false));
                });
            }

        }
    }

    const getComboVociMenu = async () => {
        dispatch(fetchIsLoadingAction(true));
        await comboService.getComboVociMenu(utenteLoggato.token).then(response => {
            setListaVociMenu(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idVoceMenu !== undefined) {
                getVoceMenu();
            }
            getComboVociMenu();
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
                            {params.idVoceMenu === undefined ? "Aggiungi" : "Modifica"} voce di menu
                        </h3>
                        <button onClick={submitForm} className="btn btn-primary"
                        ><span className='pe-1'>{params.idVoceMenu === undefined ? "Inserisci voce di menu" : "Salva modifiche"}</span>
                            <i className="fas fa-save fa-sm fa-fw "></i>
                        </button>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Voce di menu padre</label>

                            </div>
                            <select name='idVoceMenuPadre' className={formErrors?.idVoceMenuPadre != undefined ? "form-control is-invalid" : "form-control"} onChange={aggiornaVoceMenuPadre} value={idVoceMenuPadre}>
                                <option value={""}>Scegli...</option>
                                {Array.isArray(listaVociMenu) && listaVociMenu.map((val: any) =>
                                    <option value={val.idVoceMenu} >{val.descrizione}</option>
                                )}
                            </select>
                            <small className='text-danger'>{formErrors?.idVoceMenuPadre}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Descrizione<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='descrizione' type={"text"} onChange={aggiornaStato} className={formErrors?.descrizione != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una descrizione..."} value={voceMenu?.descrizione} />

                            <small className='text-danger'>{formErrors?.descrizione}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Path<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='path' type={"text"} onChange={aggiornaStato} className={formErrors?.path != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il path..."} value={voceMenu?.path} />

                            <small className='text-danger'>{formErrors?.path}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Icona<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='icona' type={"text"} onChange={aggiornaStato} className={formErrors?.icona != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un'icona (fa-solid fa-users)"} value={voceMenu?.icona} />

                            <small className='text-danger'>{formErrors?.icona}</small>
                        </div>

                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Ordine<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='ordine' type={"number"} onChange={aggiornaStato} className={formErrors?.ordine != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un numero per definire l'ordine..."} value={voceMenu?.ordine} />

                            <small className='text-danger'>{formErrors?.ordine}</small>
                        </div>


                    </div>
                </div>
            </div>
        </Layout >
    );

}