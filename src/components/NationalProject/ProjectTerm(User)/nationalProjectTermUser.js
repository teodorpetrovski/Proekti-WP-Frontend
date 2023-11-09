import React from "react";
import "./styles.css"
import {Link} from 'react-router-dom';

const NationalProjectTermUser = (props) => {



    return (
        <div className="col">
                <div
                    className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <Link className={"text-dark"} to={`/national/details/${props.term.id}`} style={{ textDecoration: 'none' }}>
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име на проектот: </strong>{props.term.name}<br/>
                            <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
                            <strong>Повик: </strong>{props.term.scientificProjectCall.name}<br/>
                            <strong>Раководител на проектот: </strong>{props.term.manager.name}<br/>
                            <strong>Статус: </strong>{props.term.typeStatus}<br/>
                        </p>
                        </Link>
                    </div>
                </div>
        </div>
    );


}
export default NationalProjectTermUser;



