import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction, fetchTestoSuccessAction, fetchTestoWarnAction } from '../modules/feedback/actions';
import { fetchTokenAction } from '../modules/utenteLoggato/actions';
import utenteService from '../services/AutenticazioneService';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: any) {
    const dispatch = useDispatch();
    const utente = useSelector((state: any) => state.utenteLoggato);
    const feedback = useSelector((state: any) => state.feedback);

    const [eseguitoControlloAutenticazione, setEseguitoControlloAutenticazione] = React.useState(false);


    document.getElementsByTagName("body")[0].classList.remove("bg-gradient-danger");
    let navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].remove();
        document.getElementsByTagName("body")[0].classList.remove("modal-open");
        navigate("/login");
    }

    const verificaAutenticazione = async () => {

        console.warn("VERIFICA AUTENTICAZIONE");
        console.warn(utente);

        if (utente.token == undefined) {
            logout();
        }

        
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
                            <i className="text-primary fas fa-solid fa-spinner fa-spin fa-3x"></i>
                        </div>}


                        {!feedback.isLoading && children}
                        <Footer />

                    </div>
                </main>




            </div>

        </>
    );

}