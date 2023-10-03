import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import projectsRepository from "../../repository/projectsRepository";

const EditNationalProjectForm = (props) => {
    const navigate = useNavigate();

    const [formData, updateFormData] = useState({
        name: "",
        dateEntry: "",
        typeStatus: "",
        managerId: null,
        callId: null
    });

    const [calls, setCalls] = useState([]);
    const [managers, setManagers] = useState([]);
    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        if (props.project) {
            updateFormData(prevState => ({
                ...prevState,
                name: props.project.name || "",
                dateEntry: props.project.dateEntry || "",
                callId: props.project.callId || null,
                managerId: props.project.managerId || null,
                typeStatus: props.project.typeStatus || ""
            }));
        }
    }, [props.project]);

    useEffect(() => {
        projectsRepository.fetchCalls()
            .then(data => {
                setCalls(data);
            })
            .catch(error => {
                console.error("Error fetching calls:", error);
            });
    }, []);
    useEffect(() => {
        projectsRepository.fetchManagers()
            .then(data => {
                setManagers(data);
            })
            .catch(error => {
                console.error("Error fetching calls:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const selectedCallId = formData.callId;
        const selectedManagerId = formData.managerId;
        const preparedData = {
            name: formData.name,
            dateEntry: formData.dateEntry,
            callId: selectedCallId ? Number(selectedCallId) : null,
            managerId: selectedManagerId ? Number(selectedManagerId) : null,
            typeStatus: formData.typeStatus,
        };

        console.log("Sending the following data to onEditNatProject:", preparedData);

        try {
            await props.onEditNatProject(
                props.project.id,
                preparedData.name,
                preparedData.dateEntry,
                preparedData.callId,
                preparedData.managerId,
                preparedData.typeStatus
            );
            console.log("Project edited successfully.");
            props.loadNationalProjects();
            navigate('/national');
        } catch (error) {
            console.error("Error editing project:", error);
        }
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Име на проектот:</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateEntry">Внесен на:</label>
                        <input type="text" className="form-control" id="dateEntry" name="dateEntry" value={formData.dateEntry} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Повик:</label>
                        <select name="callId" className="form-control" value={formData.callId || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.calls.map((call) => (
                                <option key={call.id} value={call.id}>{call.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Раководител на проектот:</label>
                        <select name="managerId" className="form-control" value={formData.managerId || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.managers?.map((manager) => (
                                <option key={manager.id} value={manager.id}>{manager.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Статус:</label>
                        <select name="typeStatus" className="form-control" value={formData.typeStatus} onChange={handleChange}>
                            {TypeStatus.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Уреди</button>
                </form>
            </div>
        </div>
    );
}

export default EditNationalProjectForm;
