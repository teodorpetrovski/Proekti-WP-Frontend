import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const EditNationalProjectForm = ({ projectId, onCancel }) => {
    const history = useNavigate();

    const [project, setProject] = useState(null);
    const [formData, updateFormData] = useState({
        name: "",
        dateEntry: "",
        call: "",
        manager: "",
        typeStatus: ""
    });

    const TypeScientificProjectCall = ["OPENED", "CLOSED"];
    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        fetch(`/api/projects/national/${projectId}`)
            .then(res => res.json())
            .then(data => setProject(data));
    }, [projectId]);

    const handleInputChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name || project.name,
            dateEntry: formData.dateEntry || project.dateEntry,
            call: formData.call || project.call,
            manager: formData.manager || project.manager,
            typeStatus: formData.typeStatus || project.typeStatus
        };

        fetch(`/api/projects/national/edit/${projectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
            .then(() => {
                onCancel();
                history.push('/projects'); 
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Име на проектот:
                    <input type="text" name="name" value={formData.name} placeholder={project.name} onChange={handleInputChange}/>
                </label>
                <label>
                    Внесен на:
                    <input type="text" name="dateEntry" value={formData.dateEntry} placeholder={project.dateEntry} onChange={handleInputChange}/>
                </label>
                <label>
                    Повик:
                    <select name="call" value={formData.call.name} onChange={handleInputChange}>
                        {TypeScientificProjectCall.map(call => (
                            <option key={call} value={call}>{call}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Раководидел на проектот:
                    <input type="text" name="manager" value={formData.manager.name} placeholder={project.manager.name} onChange={handleInputChange}/>
                </label>
                <label>
                    Статус:
                    <select name="typeStatus" value={formData.typeStatus} onChange={handleInputChange}>
                        {TypeStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Уреди</button>
                <button type="button" onClick={onCancel}>Откажи</button>
            </form>
        </div>
    );
};

export default EditNationalProjectForm;
