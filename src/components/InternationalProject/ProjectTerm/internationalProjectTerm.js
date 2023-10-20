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
        <div className="col">

                    <div
                        className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                        style={{maxWidth: 390}}>
                        <div className="card-body">
                            <Link to={`/international/${props.term.id}`} style={{ textDecoration: 'none' }}>
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
                            <Link className={"btn btn-info ml-2"}
                                  onClick={() => props.onEdit(props.term.id)}
                                  to={`/international/edit/${props.term.id}`}>
                                Уреди
                            </Link>
                            <a title={"Delete"} className={"btn btn-danger"}
                               onClick={() => props.onDelete(props.term.id)}>
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

        </div>
    );
}

export default InternationalProjectTerm;