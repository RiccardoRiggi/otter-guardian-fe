import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import { fetchCognomeAction, fetchDataCreazioneAction, fetchEmailAction, fetchNomeAction, resetUtenteAction } from '../modules/utenteLoggato/actions';
import utenteLoggatoService from '../services/UtenteLoggatoService';
import BreadCrumb from './Breadcrumbs';

export default function Header() {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    // Toggle Sidenav
    const iconNavbarSidenav: any = document.getElementById('iconNavbarSidenav');
    const iconSidenav: any = document.getElementById('iconSidenav');
    const sidenav: any = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';

    function toggleSidenav() {
        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function () {
                sidenav.classNameList.remove('bg-white');
            }, 100);
            sidenav.classNameList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    const logout = async () => {
        dispatch(fetchIsLoadingAction(true));

        await utenteLoggatoService.invalidaToken(utenteLoggato.token).then(response => {
            console.info("TOKEN INVALIDATO CON SUCCESSO");

            dispatch(resetUtenteAction());
            navigate("/login");
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });

    }

    const getUtenteLoggato = async () => {

        dispatch(fetchIsLoadingAction(true));


        await utenteLoggatoService.getUtenteLoggato(utenteLoggato.token).then(response => {
            console.info(response.data);
            dispatch(fetchNomeAction(response.data.nome));
            dispatch(fetchCognomeAction(response.data.cognome));
            dispatch(fetchEmailAction(response.data.email));
            dispatch(fetchDataCreazioneAction(response.data.dataCreazione));


            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }

    useEffect(() => {
        if (utenteLoggato.nome === undefined) {
            getUtenteLoggato();
        }

    }, []);

    return (
        <>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                <div className="container-fluid py-1 px-3">
                    <BreadCrumb />
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul className="navbar-nav  justify-content-end">

                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-dark p-0" id="iconNavbarSidenav" onClick={toggleSidenav}>
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                    </div>
                                </a>
                            </li>

                            <li className="nav-item dropdown pe-3 ps-3 d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-bell cursor-pointer"></i>
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                    <li className="mb-2">
                                        <a className="dropdown-item border-radius-md" href="javascript:;">
                                            <div className="d-flex py-1">
                                                <div className="my-auto">
                                                    <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="text-sm font-weight-normal mb-1">
                                                        <span className="font-weight-bold">New message</span> from Laur
                                                    </h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                        <i className="fa fa-clock me-1"></i>
                                                        13 minutes ago
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-white p-0" id="dropdownUtente" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user cursor-pointer pe-1"></i>
                                    <span className="d-sm-inline d-none font-weight-bold">{utenteLoggato.nome} {utenteLoggato.cognome}</span>
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end  px-2  me-sm-n4" aria-labelledby="dropdownUtente">
                                    <li className="mb-2">
                                        <Link to="/impostazioni" className="dropdown-item" aria-current="page">
                                            <i className="fa fa-cogs fixed-plugin-button-nav cursor-pointer pe-2 text-primary"></i>
                                            Impostazioni</Link>

                                    </li>
                                    <li className="mb-2">
                                        <span className="dropdown-item" aria-current="page" onClick={logout} >
                                            <i className="fa fa-right-from-bracket fixed-plugin-button-nav cursor-pointer pe-2 text-primary"></i>
                                            Logout</span>

                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    );

}

