import React from "react";
import "./styles.css"
import {Link} from "react-router-dom";

const CallTerm = (props) => {
    return (
        <div>
            <Link onClick={() => props.onGetNationalProjects(props.term.id)}
                  to={`/calls/projectsByCall/${props.term.id}`} style={{textDecoration: 'none'}}>
                <div
                    className={`card rounded-0 bg-white m-0 border-0 ${props.term.typeScientificProjectCall === 'OPENED' ? 'green-corner' : 'red-corner'} `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име на повикот: </strong>{props.term.name}<br/>
                            <strong>Статус на повикот: </strong>{props.term.typeScientificProjectCall}<br/>
                            <strong>Краен рок за аплицирање: </strong>{props.term.endDate}<br/>
                            <strong>Финансиер: </strong>{props.term.grantHolder.name}<br/>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CallTerm;