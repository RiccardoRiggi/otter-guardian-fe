import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getData, getOra } from '../DateUtil';
import logService from '../services/LogService';


export default function LogsPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [isTail, setTail] = React.useState(false);
    const [paginaLogs, setPaginaLogs] = React.useState(1);
    const [logs, setLogs] = React.useState([]);

    let interval: any;
    const [idInterval, setIdInterval] = React.useState("");




    const abilitaModalitaTail = () => {
        setTail(true);

        interval = setInterval(async () => {
            getLogs(1);
        }, 3000);
        setIdInterval(interval);

    }

    const disabilitaModalitaTail = () => {
        setTail(false);
        clearInterval(idInterval);
    }

    const getLogs = async (pagina: any) => {

        if (pagina !== 0) {

            await logService.getLogs(utenteLoggato.token, pagina, params.livelloLog).then(response => {
                console.info(response.data);


                if (response.data.length !== 0) {
                    setLogs(response.data);
                    setPaginaLogs(pagina);
                }


            }).catch(e => {
                console.error(e);

            });
        }
    }


    useEffect(() => {
        getLogs(1);
    }, [params.livelloLog]);


    return (
        <Layout>
            <div className='row'>
                <div className='col-12'>

                    <div className="card shadow-lg mx-4 mt-3">
                        <div className="card-header pb-0">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-1">
                                    <i className="fa-solid fa-terminal text-primary fa-1x pe-2 "></i>
                                    Log applicativi
                                </h3>
                                {!isTail &&
                                    <button onClick={abilitaModalitaTail} className="btn btn-primary ms-auto"><i className="fa-solid fa-circle-play pe-2"></i>Abilita modalità tail</button>
                                }
                                {isTail &&
                                    <button onClick={disabilitaModalitaTail} className="btn btn-primary ms-auto"><i className="fa-solid fa-circle-stop pe-2"></i>Disabilita modalità tail</button>
                                }
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <div className="row gx-4">

                                <><div className='col-12 '>
                                    <div className='table-responsive'>
                                        <table className="table table-striped table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Livello</th>
                                                    <th scope="col">Data evento</th>
                                                    <th scope="col">Descrizione</th>
                                                    <th scope="col">Indirizzo Ip</th>
                                                    <th scope='col'>Metodo</th>
                                                    <th scope='col'>Path</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Array.isArray(logs) && logs.map((log: any, index: number) =>
                                                        <tr key={index}>
                                                            <th scope="row" className='text-center'>
                                                                {log.logLevel === "ERROR" &&
                                                                    <i className="fa-solid fa-xmark text-danger"></i>
                                                                }
                                                                {log.logLevel === "WARN" &&
                                                                    <i className="fa-solid fa-triangle-exclamation text-warning"></i>
                                                                }
                                                                {log.logLevel === "INFO" &&
                                                                    <i className="fa-solid fa-info text-info"></i>
                                                                }
                                                                {log.logLevel === "DEBUG" &&
                                                                    <i className="fa-solid fa-bug-slash text-success"></i>
                                                                }</th>
                                                            <td>{getOra(log.dataEvento)} {getData(log.dataEvento)}</td>
                                                            <td className='text-start'>{log.testo}</td>
                                                            <td>{log.indirizzoIp}</td>
                                                            <td>
                                                                {log.metodoHttp}
                                                            </td>
                                                            <td>
                                                                {log.path}
                                                            </td>
                                                        </tr>
                                                    )}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                    <div className='col-6 text-end pt-2'>
                                        <span onClick={() => getLogs(paginaLogs - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                                    </div>
                                    <div className='col-6 text-start pt-2'>
                                        <span onClick={() => getLogs(paginaLogs + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                                    </div></>

                            </div>
                        </div>
                    </div>
                
            </div>

        </div>
        </Layout >
    );

}