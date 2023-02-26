import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction, fetchTestoSuccessAction, fetchTestoWarnAction } from '../modules/feedback/actions';
import { fetchTokenAction, resetUtenteAction } from '../modules/utenteLoggato/actions';
import utenteService from '../services/AutenticazioneService';
import utenteLoggatoService from '../services/UtenteLoggatoService';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

export default function Layout({ children }: any) {
    const dispatch = useDispatch();
    const location = useLocation();

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const feedback = useSelector((state: any) => state.feedback);

    const [eseguitoControlloAutenticazione, setEseguitoControlloAutenticazione] = React.useState(false);


    document.getElementsByTagName("body")[0].classList.remove("bg-gradient-danger");
    let navigate = useNavigate();



    const verificaAutenticazione = async () => {

        console.warn("VERIFICA AUTENTICAZIONE");
        await utenteLoggatoService.verificaAutenticazione(utenteLoggato.token).catch(e => {
            dispatch(resetUtenteAction());
            navigate("/login");
        });


    }


    useEffect(() => {
        if (!eseguitoControlloAutenticazione) {
            verificaAutenticazione();
            setEseguitoControlloAutenticazione(true);

        }
    });





    return (
        <>
            <div className="min-height-300 bg-primary position-absolute w-100"></div>



            <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

                <Sidebar />
                <main className="main-content position-relative border-radius-lg pt-3">
                    <Header></Header>

                    <div className="container-fluid py-4">


                        {feedback.isLoading && <div className="text-center">
                            <i className="text-white fas fa-solid fa-spinner fa-spin fa-3x"></i>
                        </div>}


                        {!feedback.isLoading && children}
                        <Footer />

                    </div>
                </main>




            </div>

        </>
    );

}