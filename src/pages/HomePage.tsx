import React, { useEffect } from 'react';
import Layout from '../components/Layout';

import statisticheService from '../services/statisticheService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




export default function HomePage() {

    const navigate = useNavigate();

    const [numeroUtenti, setNumeroUtenti] = React.useState(0);
    const [numeroVeicoli, setNUmeroVeicoli] = React.useState(0);
    const [numeroChecklistTemplate, setNumeroChecklistTemplate] = React.useState(0);
    const [numeroChecklist, setNumeroChecklist] = React.useState(0);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);

    const [statistiche, setStatistiche] = React.useState<any>([]);


    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getStatisticheMetodi();

        }





    }
    );

    const getValoreMassimo = () => {
        let valoreMax = 0;
        for (let c = 0; c < statistiche.length; c++) {
            if (parseInt(statistiche[c].chiamate) > valoreMax) {
                valoreMax = parseInt(statistiche[c].chiamate);
            }
        }
        console.warn(valoreMax)
        return valoreMax + Math.round(valoreMax / 10);
    }


    const getStatisticheMetodi = async () => {


        await statisticheService.getStatisticheMetodi(utenteLoggato.token).then(response => {
            console.info(response.data);


            setStatistiche(response.data);


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






    return (
        <Layout>
            <div className='row'>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Utenti registrati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroUtenti}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Veicoli registrati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroVeicoli}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-ambulance fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Template checklist creati</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroChecklistTemplate}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Checklist compilate</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numeroChecklist}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-12 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div >
                                <h3 className="">
                                    <i className="fa-solid fa-sitemap text-primary fa-1x pe-2 "></i>
                                    Risorse chiamate
                                </h3>

                                {
                                    Array.isArray(statistiche) && statistiche.map((statistica: any, index: number) =>
                                        <><div className="pt-3 text-xs font-weight-bold text-primary  mb-1">
                                            {statistica.nomeMetodo}</div>
                                            <div className="progress" style={{ height: "20px" }}>
                                                <div className="progress-bar" style={{ width: (statistica.chiamate * 100 / getValoreMassimo() > 15 ? statistica.chiamate * 100 / getValoreMassimo() + "%" : 15 + "%") }} >{statistica.chiamate} chiamate</div>
                                            </div></>
                                    )}



                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );

}