import React, { useState } from "react";
import "./styles.css"
import EditInternationalProjectForm from "../../Update/EditInternationalProject";

const InternationalProjectTerm = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="col">
            {isEditing ? (
                <EditInternationalProjectForm projectId={props.term.id} onCancel={() => setIsEditing(false)}/>
            ) : (
                <a href="/your-link-here" style={{textDecoration: 'none'}}>
                    <div
                        className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                        style={{maxWidth: 390}}>
                        <div className="card-body">
                            <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                            <p className="card-text p-1" style={{fontSize: '15px'}}>
                                <strong>Име на проектот: </strong>{props.term.description}<br/>
                                <strong>Тип на проектот: </strong>{props.term.type}<br/>
                                <strong>Почеток на проектот: </strong>{props.term.startDate}<br/>
                                <strong>Крај на проектот: </strong>{props.term.endDate}<br/>
                                <strong>Финансиер: </strong>{props.term.primaryGrantHolder.name}<br/>
                                <strong>Статус: </strong>{props.term.status}<br/>
                            </p>
                            <button className="btn btn-success btn-sm" onClick={() => setIsEditing(true)}>Уреди</button>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
}

export default InternationalProjectTerm;