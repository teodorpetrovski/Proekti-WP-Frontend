import React from "react";
import "./styles.css"
import {Link} from 'react-router-dom';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoneIcon from '@mui/icons-material/Done';
import PrintIcon from '@mui/icons-material/Print';

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

    const handleFinishClick = () => {
        if (props.term.finished) {
            return;
        }
        props.onFinish(props.term.id);
    };

    return (
        <div>
                <div
                    className={`card rounded-0 bg-white m-0 border-0 ${props.term.approved === true ? 'green-corner' : 'red-corner'} `}
                    className={`card rounded-0 bg-white m-0 border-0 ${props.term.finished === true ? 'green-corner' : 'red-corner'} `}
                    style={{maxWidth: 390}}>
                    <div className="card-body">
                        <Link className={"text-dark"} to={`/national/details/${props.term.id}`} style={{ textDecoration: 'none' }}>
                        <h2 className="card-title fw-lighter" style = {{color: '#2319e0'}}>{props.term.name}</h2>
                        <p className="card-text p-1" style={{fontSize: '15px'}}>
                            <strong>Име на проектот: </strong>{props.term.name}<br/>
                            <strong>Внесен на: </strong>{props.term.dateEntry}<br/>
                            <strong>Повик: </strong>{props.term.scientificProjectCall.name}<br/>
                            <strong>Раководител на проектот: </strong>{props.term.manager.name}<br/>
                            <strong>Статус: </strong>{props.term.typeStatus}<br/>
                        </p>
                        </Link>
                        <Link
                            className={"btn mb-2 mt-3 ms-5 w-20 p-1"}
                            onClick={() => props.onEdit(props.term.id)}
                            to={`/national/edit/${props.term.id}`}
                            style={{ color: 'white', backgroundColor: '#5ebd9a'}}
                        >
                            <EditNoteOutlinedIcon style={{color: 'white'}}></EditNoteOutlinedIcon>Уреди
                        </Link>

                        <button title="Delete" className="btn mb-2 mt-3 ms-3 p-1" onClick={() => props.onDelete(props.term.id)}
                                style={{ color: 'white', backgroundColor: '#ed6673'}}
                        >
                            <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                            Избриши
                        </button>

                        <br/>
                        <button className="btn btn-sm  mt-3 ms-5 w-20 p-1" onClick={handleExportClick}
                        style={{color: 'white', backgroundColor: '#f0ce37'}}>
                            <PrintIcon style = {{color: 'white'}}></PrintIcon>
                            Експорт
                        </button>
                        <button
                            className="btn btn-sm mt-3 ms-3 w-20 p-1"
                            onClick={handleApproveClick}
                            disabled={props.term.approved}
                            style = {{color : 'white', backgroundColor: '#f0ce37'}}
                        >
                            <DoneIcon style={{color: 'white'}}></DoneIcon>
                            {props.term.approved ? 'Одобрено' : 'Одобри'}
                        </button>
                        <button
                            className="btn btn-warning btn-sm mt-3 ms-3 w-20"
                            onClick={handleFinishClick}
                            disabled={props.term.finished}
                        >
                            {props.term.finished ? 'Завршено' : 'Заврши'}
                        </button>
                    </div>
                </div>
        </div>
    );


}
export default NationalProjectTerm;



