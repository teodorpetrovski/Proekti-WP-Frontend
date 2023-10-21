import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import projectsRepository from "../../../repository/projectsRepository";

const EditInternationalProjectForm = (props) => {
    const navigate = useNavigate();

    const [formData, updateFormData] = useState({
        name: "",
        type: "",
        startDate: "",
        endDate: "",
        primaryInstitution: null,
        typeStatus: ""
    });

    const [grandholders, setGrandholders] = useState([]);
    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        if (props.project && props.project.primaryGrantHolder) {
            updateFormData(prevState => ({
                ...prevState,
                name: props.project.name || "",
                type: props.project.type || "",
                startDate: props.project.startDate || "",
                endDate: props.project.endDate || "",
                primaryInstitution: props.project.primaryInstitution || null,
                typeStatus: props.project.typeStatus || ""
            }));
        }
    }, [props.project]);

    useEffect(() => {
        projectsRepository.fetchGrandholders()
            .then(data => {
                setGrandholders(data);
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

        if (!formData.primaryInstitution) {
            alert("Please select a Primary Grant Holder before submitting!");
            return;
        }

        const selectedInstitutionId = formData.primaryInstitution;
        const preparedData = {
            name: formData.name,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            primaryInstitution: selectedInstitutionId ? (selectedInstitutionId) : null,
            typeStatus: formData.typeStatus
        };

        console.log("Sending the following data to onEditNatProject:", preparedData);

        try {
            await props.onEditIntProject(
                props.project.id,
                preparedData.name,
                preparedData.type,
                preparedData.startDate,
                preparedData.endDate,
                preparedData.primaryInstitution,
                preparedData.typeStatus
            );
            console.log("Project edited successfully.");
            props.loadInternationalProjects();
            navigate('/international');
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
                        <label htmlFor="type">Тип на проектот:</label>
                        <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Почеток на проектот:</label>
                        <input type="text" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Крај на проектот:</label>
                        <input type="text" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Финансиер:</label>
                        <select name="primaryInstitution" className="form-control" value={formData.primaryInstitution || ""} onChange={handleChange}>
                        <option value="">None</option>
                            {props.grandholders?.map((primaryInstitution) => (
                                <option key={primaryInstitution.id} value={primaryInstitution.id}>{primaryInstitution.name}</option>
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
                    <button id="submit" type="submit" className="btn btn-primary mt-3">Уреди</button>
                </form>
            </div>
        </div>
    );
}

export default EditInternationalProjectForm;
