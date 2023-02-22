import React, { useEffect } from 'react';
import Layout from '../components/Layout';


export default function HomePage() {

    const [numeroUtenti, setNumeroUtenti] = React.useState(0);
    const [numeroVeicoli, setNUmeroVeicoli] = React.useState(0);
    const [numeroChecklistTemplate, setNumeroChecklistTemplate] = React.useState(0);
    const [numeroChecklist, setNumeroChecklist] = React.useState(0);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

   

    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);

        }
    });


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

            </div>
        </Layout>
    );

}