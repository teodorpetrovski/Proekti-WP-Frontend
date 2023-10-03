import React from "react";
import "./styles.css"

const GrantHolderTerm = (props) => {
    return (
        <div className="col">
            <a href="/grantHolder/{id}" style={{textDecoration: 'none'}}>
                <div
                    className={`card rounded-0 bg-white mb-3 `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име: </strong>{props.term.name}<br/>
                            <strong>Опис: </strong>{props.term.description}<br/>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default GrantHolderTerm;