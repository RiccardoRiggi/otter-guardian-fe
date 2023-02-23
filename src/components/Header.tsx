import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUtenteAction } from '../modules/utenteLoggato/actions';

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

    const logout = () => {
        dispatch(resetUtenteAction());
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">Pages</a></li>
                            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
                        </ol>
                        <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
                    </nav>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div className="input-group">
                                <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Type here..." />
                            </div>
                        </div>
                        <ul className="navbar-nav  justify-content-end">
                            <li className="nav-item d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-white font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1"></i>
                                    <span className="d-sm-inline d-none">Sign In</span>
                                </a>
                            </li>
                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-dark p-0" id="iconNavbarSidenav" onClick={toggleSidenav}>
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item px-3 d-flex align-items-center">
                                <a href="javascript:;" className="nav-link text-white p-0">
                                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                                </a>
                            </li>
                            <li className="nav-item dropdown pe-2 d-flex align-items-center">
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
                                    <span className="d-sm-inline d-none font-weight-bold">NOME COGNOME</span>
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end  px-2  me-sm-n4" aria-labelledby="dropdownUtente">
                                    <li className="mb-2">
                                        <span className="dropdown-item" aria-current="page" onClick={logout} >Logout</span>

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

