import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);


    // Toggle Sidenav
    const iconNavbarSidenav: any = document.getElementById('iconNavbarSidenav');
    const iconSidenav: any = document.getElementById('iconSidenav');
    let sidenav: any = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';




    function toggleSidenav() {

        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function () {
                sidenav.classList.remove('bg-white');
            }, 100);
            sidenav.classList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    window.addEventListener("resize", navbarColorOnResize);

    let referenceButtons: any = document.querySelector('[data-class]');


    function navbarColorOnResize() {

        if (sidenav == null) {
            sidenav = document.getElementById('sidenav-main');
        }

        if (referenceButtons == null) {
            referenceButtons = document.querySelector('[data-class]');
        }

        if (window.innerWidth > 1200 && referenceButtons != null) {
            if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
                sidenav.classList.remove('bg-white');
            } else {
                if (!body.classList.contains('dark-version')) {
                    sidenav.classList.add('bg-white');
                }
            }
        } else {
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
        }
    }

    return (

        <>
            <aside
                className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 shadow-lg"
                id="sidenav-main">
                <div className="sidenav-header text-center">
                    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
                        aria-hidden="true" id="iconSidenav" onClick={toggleSidenav}></i>
                    <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html "
                        target="_blank">
                        <h1>LOGO</h1>
                    </a>
                </div>
                <div className="collapse navbar-collapse  w-auto mt-5" id="sidenav-collapse-main">
                    <ul className="navbar-nav">

                        {/*anagraficaOperatore.codProfilo != undefined && anagraficaOperatore.codEntita != undefined && anagraficaOperatore.menu ?
                                anagraficaOperatore.menu.map((elemento: any, index: any) => {
                                    if (elemento.listaTransazioniFiglie == undefined) {
                                        return <li title={elemento.descrizione} className="nav-item">
                                            <Link className="nav-link py-1" to={"/" + elemento.urllinkesterno}>
                                                <div
                                                    className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-home text-primary text-sm opacity-10"></i>
                                                </div>
                                                <span className="nav-link-text ms-1">{elemento.descrizione}</span>
                                            </Link>
                                        </li>


                                    } else {
                                        return <li className="nav-item">
                                            <span className="nav-link cursor-pointer py-1 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + elemento.codtransazione + "-collapse"} aria-expanded="false">
                                                <div
                                                    className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-home text-primary text-sm opacity-10"></i>
                                                </div>
                                                <span className="nav-link-text ms-1">{elemento.descrizione}</span>
                                            </span>
                                            <div className="collapse " id={elemento.codtransazione + "-collapse"}>
                                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                    {

                                                        elemento.listaTransazioniFiglie.map((figlio: any) => (

                                                            <li title={figlio.descrizione} className="nav-item mx-3">
                                                                <Link className="nav-link py-1 " to={"/" + elemento.urllinkesterno}>
                                                                    <div
                                                                        className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                                                        <i className="fas fa-home text-primary text-sm opacity-10"></i>
                                                                    </div>
                                                                    <span className="nav-link-text ms-1">{figlio.descrizione}</span>
                                                                </Link>
                                                            </li>

                                                        ))

                                                    }</ul>
                                            </div>
                                        </li>

                                    }

                                }) : <></>*/}
                        

                    </ul>
                </div>

            </aside>
        </>
    );

}