import React from "react";
import "./styles.css"

const CallTerm = (props) => {
    return (
        <div className="col">
            <a href="/calls/{id}" style={{textDecoration: 'none'}}>
                <div
                    className={`card rounded-0 bg-white mb-3 ${props.term.typeScientificProjectCall === 'OPENED' ? 'green-corner' : 'red-corner'} `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име на повикот: </strong>{props.term.description}<br/>
                            <strong>Статус на повикот: </strong>{props.term.typeScientificProjectCall}<br/>
                            <strong>Краен рок за аплицирање: </strong>{props.term.endDate}<br/>
                            <strong>Финансиер: </strong>{props.term.grantHolder.name}<br/>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default CallTerm;