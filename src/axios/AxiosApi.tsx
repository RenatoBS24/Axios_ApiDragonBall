import React, {useEffect, useState} from "react";

import axios from "axios";

// https://www.dragonball-api.com/api
const AxiosAPI = () =>{
    interface Personaje{
        name:string;
        ki: number;
        race:string;
        image:string;
        description:string;
        maxKi: number;
        gender:string;
        affiliation: string;
    }
    const[list, setList] = useState<Personaje[]>([]);
    const [error, setError] = useState<any>(null);
    const api = () => {axios.get("https://dragonball-api.com/api/characters?limit=53")
        .then((result) => setList(result.data.items))
        .catch((error) =>{
            console.log(error);
            setError(error);
        });
    }
    useEffect(() => {
        api();
    }, []);
    return (
        <div>
            <h2>Personajes de Dragon BALL</h2>
            {
                error && <h2 className="text-warning">Ocurrio un error al cargar los datos</h2>
            }
            <div className="row d-flex justify-content-center align-items-center col-12">
                {list.map((item:Personaje) =>{
                    let name:string = '#'+item.name.replace(/\s+/g, '');
                    let gender = item.gender;
                    if(gender === 'Male'){
                        gender = 'Masculino';
                    }
                    if(gender === 'Female'){
                        gender = 'Femenino';
                    }
                    return (
                        <div className="card col-3 m-3" key={item.name}>
                            <img src={item.image} alt="" width={280} height={400}/>
                            <div className="card-header">
                                <h2 className="card-title">{item.name}</h2>
                            </div>
                            <div className="card-body">
                                <span>Especie:{item.race} </span>
                                <br/>
                                <span>Ki : {item.ki}</span>
                                <br/>
                                <span>MaxKi : {item.maxKi} </span>
                                <br/>
                                <span>Genero : {gender}</span>
                                <br/>
                                <span>Afiliacion: {item.affiliation}</span>
                            </div>
                            <div className="card-footer">
                                <a className="btn btn-primary" data-bs-toggle = "modal" data-bs-target={name} >Ver mas</a>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            {
                list.map((item:Personaje) =>{
                    let nameID:string = item.name.replace(/\s+/g, '');
                    return (
                        <div className="modal fade" id={nameID} key={nameID}>
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content rounded">
                                    <div className="modal-header">
                                        <h2>{item.name}</h2>
                                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body p-5">
                                        <p className="fs-5">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default AxiosAPI;