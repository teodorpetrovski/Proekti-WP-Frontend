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
        typeStatus: "",
        description: "",
        goals: "",
        anotherInstitution: null,
        carrier: null,
        partners: null
    });
    const TypeStatus = ["OLD", "NEW"];

    useEffect(() => {
        if (props.project && props.project.primaryGrantHolder) {
            updateFormData(prevState => ({
                ...prevState,
                name: props.project.name || "",
                type: props.project.type || "",
                startDate: props.project.startDate || "",
                endDate: props.project.endDate || "",
                primaryInstitution: props.project.primaryGrantHolder?.id || null,
                typeStatus: props.project.typeStatus || "",
                description: props.project.description || "",
                goals: props.project.goals || "",
                anotherInstitution: props.project.anotherGrantHolder?.id || null,
                carrier: props.project.carrier?.id || null,
                partners: props.project.partners?.id || null,
            }));
        }
    }, [props.project]);

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
            primaryInstitution: formData.primaryInstitution ? Number(formData.primaryInstitution) : null,
            typeStatus: formData.typeStatus,
            description: formData.description,
            goals: formData.goals,
            anotherInstitution: formData.anotherInstitution ? Number(formData.anotherInstitution) : null,
            carrier: formData.carrier ? Number(formData.carrier) : null,
            partners: formData.partners ? Number(formData.partners) : null
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
                preparedData.typeStatus,
                preparedData.description,
                preparedData.goals,
                preparedData.anotherInstitution,
                preparedData.carrier,
                preparedData.partners
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
                <h2>Уреди</h2>
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
                    <div className="form-group">
                        <label htmlFor="description">Опис:</label>
                        <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goals">Цели:</label>
                        <input type="text" className="form-control" id="goals" name="goals" value={formData.goals} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Друг финансиер:</label>
                        <select name="anotherInstitution" className="form-control" value={formData.anotherInstitution || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((anotherInstitution) => (
                                <option key={anotherInstitution.id} value={anotherInstitution.id}>{anotherInstitution.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Носител:</label>
                        <select name="carrier" className="form-control" value={formData.carrier || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((carrier) => (
                                <option key={carrier.id} value={carrier.id}>{carrier.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Партнер:</label>
                        <select name="partners" className="form-control" value={formData.partners || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((partners) => (
                                <option key={partners.id} value={partners.id}>{partners.name}</option>
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
