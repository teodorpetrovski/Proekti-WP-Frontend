import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const InternationalProjectAdd = (props) => {

    const navigate = useNavigate();

    const [formData, updateFormData] = React.useState({
        name: "",
        type: "",
        dateEntry: "",
        startDate: "",
        endDate: "",
        primaryInstitution: null,
        typeStatus: "",
        description: "",
        goals: "",
        anotherInstitution: null,
        carrier: null,
        partners: null
    })

    const TypeStatus = ["OLD", "NEW"];
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            type,
            dateEntry,
            startDate,
            endDate,
            primaryInstitution,
            typeStatus,
            description,
            goals,
            anotherInstitution,
            carrier,
            partners
        } = formData;

        props.onAddInternationalProject(name, type, dateEntry, startDate, endDate, primaryInstitution, typeStatus, description, goals, anotherInstitution, carrier, partners);
        navigate("/international");
    };

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Име на проектот:</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Име на проектот"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Тип на проектот:</label>
                        <input type="text"
                               className="form-control"
                               id="type"
                               name="type"
                               placeholder="Тип на проектот"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateEntry">Датум на внесување:</label>
                        <input type="date"
                               className="form-control"
                               id="dateEntry"
                               name="dateEntry"
                               placeholder="Датум на внесување"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Почеток на проектот:</label>
                        <input type="date"
                               className="form-control"
                               id="startDate"
                               name="startDate"
                               placeholder="Почеток на проектот"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">Крај на проектот:</label>
                        <input type="date"
                               className="form-control"
                               id="endDate"
                               name="endDate"
                               placeholder="Крај на проектот"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Финансиер:</label>
                        <select name="primaryInstitution" className="form-control"
                                value={formData.primaryInstitution || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((primaryInstitution) => (
                                <option key={primaryInstitution.id}
                                        value={primaryInstitution.id}>{primaryInstitution.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="typeStatus">Статус:</label>
                        <select className="form-control"
                                id="typeStatus"
                                name="typeStatus"
                                value={formData.typeStatus}
                                required
                                onChange={handleChange}
                        >
                            <option value="" disabled>Избери статус на проект</option>
                            <option value="OLD">OLD</option>
                            <option value="NEW">NEW</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Опис:</label>
                        <textarea className="form-control"
                                  id="description"
                                  name="description"
                                  required
                                  placeholder="Опис"
                                  onChange={handleChange}>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="goals">Цели:</label>
                        <input type="text"
                               className="form-control"
                               id="goals"
                               name="goals"
                               required
                               placeholder="Цели"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Друга институција:</label>
                        <select name="anotherInstitution" className="form-control"
                                value={formData.anotherInstitution || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((institution) => (
                                <option key={institution.id}
                                        value={institution.id}>{institution.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Носител:</label>
                        <select name="carrier" className="form-control"
                                value={formData.carrier || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((carrier) => (
                                <option key={carrier.id}
                                        value={carrier.id}>{carrier.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Партнер:</label>
                        <select name="partners" className="form-control"
                                value={formData.partners || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((partner) => (
                                <option key={partner.id}
                                        value={partner.id}>{partner.name}</option>
                            ))}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary mt-3">Додади</button>
                </form>
            </div>
        </div>
    )
}

export default InternationalProjectAdd;