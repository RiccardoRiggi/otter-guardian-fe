import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginInterface } from '../interfaces/LoginInterface';
import { fetchTestoDangerAction, fetchIsLoadingAction } from '../modules/feedback/actions';
import { fetchUtenteAction } from '../modules/utenteLoggato/actions';
import utenteService from '../services/AutenticazioneService';



export default function LoginPage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);


    const [email, setEmail] = React.useState("info@riccardoriggi.it");
    const [password, setPassword] = React.useState("");
    const [listaMetodiAutenticazioneSupportati, setListaMetodiAutenticazioneSupportati] = React.useState([]);
    let navigate = useNavigate();

    const annullaProcessoDiAutenticazione = () => {
        setListaMetodiAutenticazioneSupportati([]);
        setEmail("");
        setPassword("");
    }


    const getMetodiAutenticazioneSupportati = async () => {

        dispatch(fetchIsLoadingAction(true));

        let jsonBody: any = {
            email: email,
        }

        await utenteService.getMetodiAutenticazioneSupportati(jsonBody).then(response => {
            console.info(response.data);
            setListaMetodiAutenticazioneSupportati(response.data);

            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center mx-auto">
                        <h1 className=" mb-2 mt-5"><i className="fa-solid fa-otter text-primary"></i></h1>
                        <p className="text-lead">Otter Guardian</p>
                    </div>
                </div>
            </div>
            {feedback.isLoading &&
                <>
                    <main className="main-content  mt-0">
                        <section>
                            <div className="page-header min-vh-80">
                                <div className="container">
                                    <div className="row">
                                        <div className='col-12 text-center'>
                                            <i className="text-primary fa-3x fa-solid fa-spinner fast-spin fa-spin"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            }

            {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length == 0 &&
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-80">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card card-plain">
                                            <div className="card-header pb-0 text-start">
                                                <h4 className="font-weight-bolder">Autenticazione</h4>
                                                <p className="mb-0">Inserisci il tuo indirizzo email per proseguire</p>
                                            </div>
                                            <div className="card-body">
                                                <form role="form">
                                                    <div className="mb-3">
                                                        <input type="email" onChange={(event) => { setEmail(event.currentTarget.value) }} value={email} className="form-control form-control-lg" placeholder="Email" aria-label="Email" />
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col-xl-4 col-lg-4 col-md-8 mx-0 mx-auto'>
                                        <div className="card card-plain">
                                            <div className="card-body mx-0 pt-0 ">
                                                <div className='row d-flex align-items-center'>
                                                    <div className='col-3 text-center'>
                                                        <i className="fa-solid fa-qrcode fa-2x"></i>
                                                    </div>
                                                    <div className='col-9'>
                                                        <span onClick={getMetodiAutenticazioneSupportati} className="btn btn-lg btn-primary btn-lg w-100 mb-0">Avanti</span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                <p className="mb-4 text-sm mx-auto">
                                                    Hai dimenticato la password?
                                                    <a href="javascript:;" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            }

            {!feedback.isLoading && listaMetodiAutenticazioneSupportati.length > 0 &&
                <>
                    <main className="main-content  mt-0">
                        <section>
                            <div className="page-header min-vh-80">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                            <div className="card card-plain">
                                                <div className="card-header pb-0 text-start">
                                                    <h4 className="font-weight-bolder">Autenticazione</h4>
                                                    <p className="mb-0">Seleziona il metodo di autenticazione con il quale proseguire</p>
                                                </div>
                                                <div className="card-body">
                                                    <ol className="list-group list-group-numbered">
                                                        {
                                                            Array.isArray(listaMetodiAutenticazioneSupportati) && listaMetodiAutenticazioneSupportati.map((metodoAutenticazione: any, index: number) => <>

                                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                                    <div className="ms-2 me-auto">
                                                                        {metodoAutenticazione.descrizione.substring(0, metodoAutenticazione.descrizione.indexOf("#"))}
                                                                    </div>
                                                                    <i className="fa-solid fa-chevron-right fa-2x text-primary ms-2 "></i>
                                                                </li>


                                                            </>
                                                            )}
                                                    </ol>
                                                    <div className="text-center">
                                                        <span onClick={annullaProcessoDiAutenticazione} className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Annulla</span>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                    <p className="mb-4 text-sm mx-auto">
                                                        Hai dimenticato la password?
                                                        <a href="javascript:;" className="ps-1 text-primary text-gradient font-weight-bold">Clicca qui</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            }
        </>
    );

}

