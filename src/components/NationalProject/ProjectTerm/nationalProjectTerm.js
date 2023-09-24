import React from "react";
import "./styles.css"

const NationalProjectTerm = (props) => {


    return (




        <div className="col">
            <a href="/your-link-here" style={{ textDecoration: 'none' }}>
                <div className={`card rounded-0 bg-white mb-3 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `} style={{ maxWidth: 390 }}>
                    <div className="card-body">
                        <h2 className="card-title fw-lighter ">{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize:'15px'}} >


                            <strong>Име на проектот: </strong>{props.term.name}<br/>
                            <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
                            <strong>Повик: </strong>{props.term.call}<br/>
                            <strong>Раководидел на проектот: </strong>{props.term.manager}<br/>
                            <strong>Статус: </strong>{props.term.typeStatus}<br/>

                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default NationalProjectTerm;