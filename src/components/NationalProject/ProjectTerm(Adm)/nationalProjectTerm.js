import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneIcon from "@mui/icons-material/Done";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";

const NationalProjectTerm = (props) => {
    const [finishButtonClicked, setFinishButtonClicked] = useState(false);
    const [isFinished, setIsFinished] = useState(props.term.finished);
    const [buttonsDisabled, setButtonsDisabled] = useState(() => {
        const disabledState = localStorage.getItem(`buttonsDisabled_${props.term.id}`);
        return disabledState === "true" || isFinished;
    });
    const [finishButtonText, setFinishButtonText] = useState(() => {
        return localStorage.getItem(`finishButtonText_${props.term.id}`) || "Заврши";
    });
    const [otherButtonsVisible, setOtherButtonsVisible] = useState(true);

    useEffect(() => {
        const fetchFinishStatus = async () => {
            try {
                const response = await axios.get(`/api/projects/${props.term.id}`);
                setIsFinished(response.data.isFinished);
                setButtonsDisabled(response.data.isFinished || finishButtonClicked);
            } catch (error) {
                console.error("Error fetching project finish status:", error);
            }
        };

        fetchFinishStatus();
    }, [props.term.id, finishButtonClicked]);

    useEffect(() => {
        localStorage.setItem(`buttonsDisabled_${props.term.id}`, buttonsDisabled);
        localStorage.setItem(`finishButtonText_${props.term.id}`, finishButtonText);
    }, [buttonsDisabled, finishButtonText, props.term.id]);

    const handleExportClick = () => {
        try {
            props.onExport(props.term.id);
        } catch (error) {
            console.error("Error exporting project:", error);
        }
    };

    const handleApproveClick = () => {
        if (props.term.approved || finishButtonClicked || isFinished) {
            return;
        }
        props.onApprove(props.term.id);
        setButtonsDisabled(true);
        setOtherButtonsVisible(false); // Hide other buttons when "Одобри" is clicked
    };

    const handleFinishClick = async () => {
        try {
            if (props.term.approved || finishButtonClicked || isFinished) {
                return;
            }
            setFinishButtonClicked(true);
            setIsFinished(true);
            setButtonsDisabled(true);
            setFinishButtonText("Завршено");
        } catch (error) {
            console.error("Error finishing project:", error.message);
        }
    };

    const isTermClickable = !finishButtonClicked && !isFinished && !props.term.approved;


    return (
        <div>
            <div
                className={`card rounded-0 bg-white m-0 border-0 ${
                    props.term.approved === true ? "green-corner" : "red-corner"
                } ${isFinished ? "finished-project" : ""}`}
                style={{ maxWidth: 390 }}
            >
                <div className="card-body">
                    <Link
                        className={`text-dark ${!isTermClickable && "disabled-link"}`}
                        to={isTermClickable ? `/national/details/${props.term.id}` : "#"}
                        style={{ textDecoration: "none" }}
                    >
                        <h2
                            className="card-title fw-lighter"
                            style={{ color: "#2319e0" }}
                        >
                            {props.term.name}
                        </h2>
                        <p className="card-text p-1" style={{ fontSize: "15px" }}>
                            <strong>Име на проектот: </strong>
                            {props.term.name}
                            <br />
                            <strong>Внесен на: </strong>
                            {props.term.dateEntry}
                            <br />
                            <strong>Повик: </strong>
                            {props.term.scientificProjectCall.name}
                            <br />
                            <strong>Раководител на проектот: </strong>
                            {props.term.manager.name}
                            <br />
                            <strong>Статус: </strong>
                            {props.term.typeStatus}
                            <br />
                        </p>
                    </Link>
                    {otherButtonsVisible && (
                        <>
                            <button
                                className="btn btn-sm  mt-3 ms-3 w-20 p-0 ps-1 pe-1"
                                onClick={handleExportClick}
                                style={{ color: "white", backgroundColor: "#f0ce37" }}
                                disabled={buttonsDisabled}
                            >
                                <PrintIcon style={{ color: "white" }}></PrintIcon>
                                Испечати Проект
                            </button>
                            <Link
                                className={`btn mb-2 mt-3 ms-5 w-20 p-0 ps-1 pe-1 ${
                                    (finishButtonClicked || isFinished || !isTermClickable || buttonsDisabled) && "disabled"
                                } btn-primary`}
                                onClick={() => props.onEdit(props.term.id)}
                                to={`/national/edit/${props.term.id}`}
                                disabled={finishButtonClicked || isFinished || !isTermClickable || buttonsDisabled}
                            >
                                <EditNoteOutlinedIcon style={{ color: "white" }}></EditNoteOutlinedIcon>
                                Уреди
                            </Link>

                            <button
                                title="Delete"
                                className="btn mb-2 mt-3 ms-1 p-0 ps-1 pe-1 btn-danger"
                                onClick={() => props.onDelete(props.term.id)}
                                disabled={finishButtonClicked || isFinished || buttonsDisabled}
                            >
                                <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                                Избриши
                            </button>
                        </>
                    )}
                    <button
                        className="btn btn-sm mt-3 ms-1 w-20 p-0 ps-1 pe-1 mb-2 btn-success"
                        onClick={handleApproveClick}
                        disabled={props.term.approved || isFinished || buttonsDisabled}
                    >
                        <DoneIcon style={{ color: "white" }}></DoneIcon>
                        {props.term.approved ? "Одобрено" : "Одобри"}
                    </button>
                    {otherButtonsVisible && (
                        <button
                            className="btn btn-warning btn-sm mt-3 ms-3 w-20 p-0 ps-1 pe-1"
                            onClick={handleFinishClick}
                            disabled={finishButtonClicked || isFinished || props.term.approved || buttonsDisabled}
                            style={{
                                color: isFinished ? "#6c757d" : "white",
                                backgroundColor: isFinished ? "#ddd" : "#f0ce37",
                            }}
                        >
                            {finishButtonText}
                        </button>
                    )}
                    <br />
                </div>
            </div>
        </div>
    );
};

export default NationalProjectTerm;
