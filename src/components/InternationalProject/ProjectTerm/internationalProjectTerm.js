import React, {useState} from "react";
import "./styles.css"
import {Link} from 'react-router-dom';

const InternationalProjectTerm = (props) => {
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
        <div>

                    <div
                        className={`card rounded-0 bg-white m-0 border-0 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                        style={{maxWidth: 390}}>
                        <div className="card-body">
                            <Link className={"text-dark"} to={`/international/details/${props.term.id}`} style={{ textDecoration: 'none' }}>
                            <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                            <p className="card-text p-1" style={{fontSize: '15px'}}>
                                <strong>Име на проектот: </strong>{props.term.name}<br/>
                                <strong>Тип на проектот: </strong>{props.term.type}<br/>
                                <strong>Почеток на проектот: </strong>{props.term.startDate}<br/>
                                <strong>Крај на проектот: </strong>{props.term.endDate}<br/>
                                <strong>Финансиер: </strong>{props.term.primaryGrantHolder.name}<br/>
                                <strong>Статус: </strong>{props.term.typeStatus}<br/>
                            </p>
                            </Link>
                            <Link className={"btn btn-info  mb-2 mt-3 ms-5 w-20"}
                                  onClick={() => props.onEdit(props.term.id)}
                                  to={`/international/edit/${props.term.id}`}>
                                Уреди
                            </Link>
                            <a title={"Delete"} className={"btn btn-danger mb-2 mt-3 ms-3 w-20"}
                               onClick={() => props.onDelete(props.term.id)}>
                                Избриши
                            </a>
                            <button className="btn btn-primary btn-sm mt-3 ms-5 w-20" onClick={handleExportClick}>
                                Експорт
                            </button>
                            <button
                                className="btn btn-warning  btn-sm mt-3 ms-3 w-20 "
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

export default InternationalProjectTerm;