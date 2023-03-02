import { get } from 'https';
import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import vociMenuService from '../../services/VociMenuService';

export default function ListaVociMenuPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);


    const [menu, setMenu] = React.useState([]);
    const [paginaMenu, setPaginaMenu] = React.useState(1);





    const getVociMenu = async (pagina: any) => {

        if (pagina !== 0) {

            await vociMenuService.getVociMenu(utenteLoggato.token, pagina).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setMenu(response.data);
                    setPaginaMenu(pagina);
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




    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getVociMenu(paginaMenu);
        }
    }, []);


    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list-ul text-primary fa-1x pe-2 "></i>
                            Lista voci di menu
                        </h3>
                        <Link to="/scheda-voce-menu" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Inserisci voce</Link>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Descrizione</th>
                                            <th scope="col">Icona</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(menu) && menu.map((voce: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{voce.idVoceMenu}</th>
                                                    <td><small>{voce.descrizionePadre}</small><span className='d-block ps-3 text-bold'>{voce.descrizione}</span></td>
                                                    <td><i className={voce.icona + " pe-3 text-primary"}></i>{voce.icona}</td>
                                                    <td className='text-center'><span className='btn btn-primary'><i className="fa-solid fa-pen-to-square"></i></span></td>
                                                    <td className='text-center'><span className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></span></td>
                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getVociMenu(paginaMenu - 1)} className='btn btn-primary'>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getVociMenu(paginaMenu + 1)} className='btn btn-primary'>Successivo</span>
                        </div>
                    </div>
                </div>

            </div>
        </Layout >
    );

}