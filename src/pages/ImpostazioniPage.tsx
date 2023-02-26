import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { getData, getOra } from '../DateUtil';
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import dispositiviFisiciService from '../services/DispositiviFisiciService';


export default function ImpostazioniPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [dispositiviFisici, setDispositiviFisici] = React.useState([]);

    const [idNuovoDispositivoFisico, setIdNuovoDispositivoFisico] = React.useState("");

    const [idInterval, setIdInterval] = React.useState("");

    let interval: any;


    const getDispositiviFisici = async () => {

        dispatch(fetchIsLoadingAction(true));


        await dispositiviFisiciService.getDispositiviFisici(utenteLoggato.token).then(response => {
            console.info(response.data);
            setDispositiviFisici(response.data);


            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const generaIdentificativoDispositivoFisico = async () => {

        dispatch(fetchIsLoadingAction(true));


        await dispositiviFisiciService.generaIdentificativoDispositivoFisico(utenteLoggato.token).then(response => {
            console.info(response.data);
            setIdNuovoDispositivoFisico(response.data.idDispositivoFisico);
            verificaAttivazioneNuovoDispositivo(response.data.idDispositivoFisico);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    const verificaAttivazioneNuovoDispositivo = (idNuovoDispositivoFisico: any) => {
        interval = setInterval(async () => {

            await dispositiviFisiciService.isDispositivoAbilitato(utenteLoggato.token, idNuovoDispositivoFisico).then(response => {
                console.info(response.data);

                if (response.data){
                    clearInterval(interval);
                    annullaAggiuntaNuovoDispositivo();
                }



            }).catch(e => {
                console.error(e);
            });
        }, 1000);
        setIdInterval(interval);
    }

    const annullaAggiuntaNuovoDispositivo = () => {
        clearInterval(idInterval);
        setIdNuovoDispositivoFisico("");
        getDispositiviFisici();
    }


    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getDispositiviFisici();
        }
    });


    return (
        <Layout>
            <div className="card shadow-lg mx-4 ">
                <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <i className="fa-solid fa-user-astronaut text-primary fa-3x"></i>
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">
                                    {utenteLoggato.nome} {utenteLoggato.cognome}
                                </h5>
                                <p className="mb-0 font-weight-bold text-sm">
                                    {utenteLoggato.email}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">

                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                        <h3 className="mb-1">
                            <i className="fa-solid fa-mobile-screen text-primary fa-1x pe-1 "></i>
                            Dispositivi fisici
                        </h3>
                        {idNuovoDispositivoFisico === "" &&
                            <button onClick={generaIdentificativoDispositivoFisico} className="btn btn-primary ms-auto">Aggiungi dispositivo</button>
                        }
                        {idNuovoDispositivoFisico !== "" &&
                            <button onClick={annullaAggiuntaNuovoDispositivo} className="btn btn-primary ms-auto">Lista dispositivi</button>
                        }
                    </div>
                    <div className="card-body p-3">
                        <div className="row gx-4">

                            {idNuovoDispositivoFisico === "" &&
                                <div className='col-12 text-center'>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Stato</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Data abilitazione</th>
                                                <th scope="col">Data disabilitazione</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Array.isArray(dispositiviFisici) && dispositiviFisici.map((dispositivo: any, index: number) =>
                                                    <tr key={index}>
                                                        <th scope="row">{dispositivo.dataDisabilitazione === null ? <i className="fa-solid fa-circle-check text-success"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}</th>
                                                        <td>{dispositivo.nomeDispositivo}</td>
                                                        <td>{getData(dispositivo.dataAbilitazione)} ore {getOra(dispositivo.dataAbilitazione)}</td>
                                                        <td>{getData(dispositivo.dataDisabilitazione)} {dispositivo.dataDisabilitazione !== null && "ore"} {getOra(dispositivo.dataDisabilitazione)}</td>
                                                    </tr>
                                                )}


                                        </tbody>
                                    </table>
                                </div>}
                            {idNuovoDispositivoFisico !== "" && <div className='col-12 text-center'>
                                <QRCode className='w-100 ' fgColor='#344767' value={idNuovoDispositivoFisico} />
                                <small>L'aggiunta di un nuovo dispositivo fisico disabiliterà i dispositivi precedentemente configurati</small>
                            </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}