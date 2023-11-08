import React from "react";
import "./styles.css"
import {Link} from 'react-router-dom';

const NationalProjectTerm = (props) => {
    const handleExportClick = () => {
        try {
            props.onExport(props.term.id);
        } catch (error) {
            console.error("Error exporting project:", error);
        }
    };

    const handleApproveClick = () => {
        if (props.term.approved) {
            return;
        }
        props.onApprove(props.term.id);
    };


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
                        <Link className={"btn btn-info  mb-2 mt-3 ms-5 w-25 "}
                              onClick={() => props.onEdit(props.term.id)}
                              to={`/national/edit/${props.term.id}`}>
                            Уреди
                        </Link>
                        <button title="Delete" className="btn btn-danger  mb-2 mt-3 ms-3 " onClick={() => props.onDelete(props.term.id)}>
                            Избриши
                        </button>

                        <br/>
                        <button className="btn btn-primary btn-sm  mt-3 ms-5 w-25" onClick={handleExportClick}>
                            Експорт
                        </button>
                        <button
                            className="btn btn-warning btn-sm mt-3 ms-3 w-25"
                            onClick={handleApproveClick}
                            disabled={props.term.approved}
                        >
                            {props.term.approved ? 'Одобрено' : 'Одобри'}
                        </button>
                    </div>
                </div>
        </div>
    );


}
export default NationalProjectTerm;



