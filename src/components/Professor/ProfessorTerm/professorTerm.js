import React from "react";
import "./styles.css"

const ProfessorTerm = (props) => {
    return (
        <div className="col">
            <a href="/professors/{id}" style={{textDecoration: 'none'}}>
                <div
                    className={`card rounded-0 bg-white mb-3 `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име: </strong>{props.term.name}<br/>
                            <strong>Емаил: </strong>{props.term.email}<br/>
                            <strong>Титула: </strong>{props.term.title}<br/>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default ProfessorTerm;