import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import projectsRepository from "../../repository/projectsRepository";

const EditNationalProjectForm = (props) => {
    const navigate = useNavigate();

    const [formData, updateFormData] = useState({
        name: "",
        dateEntry: "",
        typeStatus: "",
        manager: "",
        callId: null
    });

    const [calls, setCalls] = useState([]);
    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        if (props.project) {
            updateFormData(prevState => ({
                ...prevState,
                name: props.project.name || "",
                dateEntry: props.project.dateEntry || "",
                callId: props.project.callId || null,
                manager: props.project.manager || "",
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
        const preparedData = {
            name: formData.name,
            dateEntry: formData.dateEntry,
            callId: selectedCallId ? Number(selectedCallId) : null,
            manager: formData.manager,
            typeStatus: formData.typeStatus,
        };

        console.log("Sending the following data to onEditNatProject:", preparedData);

        try {
            await props.onEditNatProject(
                props.project.id,
                preparedData.name,
                preparedData.dateEntry,
                preparedData.callId,
                preparedData.manager,
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
                            {this.props.calls.map((call) => (
                                <option key={call.id} value={call.id}>{call.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="manager">Раководител на проектот:</label>
                        <input type="text" className="form-control" id="manager" name="manager" value={formData.manager.name} onChange={handleChange} />
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
