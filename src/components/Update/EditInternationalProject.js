import React, { useState, useEffect } from "react";

const EditInternationalProjectForm = ({ projectId, onCancel }) => {
    const [originalProject, setOriginalProject] = useState(null);
    const [formData, updateFormData] = useState({
        name: "",
        description: "",
        type: "",
        startDate: "",
        endDate: "",
        primaryGrantHolder: { name: "" },
        status: ""
    });

    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        fetch(`/api/projects/international/${projectId}`)
            .then(res => res.json())
            .then(data => {
                setOriginalProject(data);
                updateFormData(data);
            });
    }, [projectId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({
            ...formData,
            [name]: value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name || originalProject.name,
            description: formData.description || originalProject.description,
            type: formData.type || originalProject.type,
            startDate: formData.startDate || originalProject.startDate,
            endDate: formData.endDate || originalProject.endDate,
            primaryGrantHolder: {
                name: formData.primaryGrantHolder.name || originalProject.primaryGrantHolder.name
            },
            status: formData.status || originalProject.status
        };

        fetch(`/api/projects/international/edit/${projectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
            .then(() => onCancel());
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Име на проектот:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
                </label>
                <label>
                    Тип на проектот:
                    <input type="text" name="type" value={formData.type} onChange={handleInputChange}/>
                </label>
                <label>
                    Почеток на проектот:
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}/>
                </label>
                <label>
                    Крај на проектот:
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange}/>
                </label>
                <label>
                    Финансиер:
                    <input type="text" name="primaryGrantHolder" value={formData.primaryGrantHolder.name} onChange={handleInputChange}/>
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

export default EditInternationalProjectForm;
