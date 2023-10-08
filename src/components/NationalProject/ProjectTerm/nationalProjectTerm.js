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
            <Link to={`/national/${props.term.id}`} style={{ textDecoration: 'none' }}>
                <div
                    className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име на проектот: </strong>{props.term.name}<br/>
                            <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
                            <strong>Повик: </strong>{props.term.scientificProjectCall.name}<br/>
                            <strong>Раководител на проектот: </strong>{props.term.manager.name}<br/>
                            <strong>Статус: </strong>{props.term.typeStatus}<br/>
                        </p>
                        <Link className={"btn btn-info ml-2"}
                              onClick={() => props.onEdit(props.term.id)}
                              to={`/national/edit/${props.term.id}`}>
                            Уреди
                        </Link>
                        <a title="Delete" className="btn btn-danger" onClick={() => props.onDelete(props.term.id)}>
                            Избриши
                        </a>
                        <button className="btn btn-primary btn-sm" onClick={handleExportClick}>
                            Експорт
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={handleApproveClick}
                            disabled={props.term.approved}
                        >
                            {props.term.approved ? 'Одобрено' : 'Одобри'}
                        </button>
                    </div>
                </div>
            
            </Link>
        </div>
    );


}
export default NationalProjectTerm;



