import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const InternationalProjectAdd = (props) => {

    const navigate = useNavigate();
    
    const [formData, updateFormData] = React.useState({
        name: "",
        type: "",
        startDate: "",
        endDate: "",
        primaryInstitution: null,
        typeStatus: "",
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
        const name = formData.name;
        const type = formData.type;
        const startDate = formData.startDate;
        const endDate = formData.endDate;
        const primaryInstitution = formData.primaryInstitution;
        const typeStatus = formData.typeStatus;

        props.onAddInternationalProject(name, type, startDate, endDate, primaryInstitution, typeStatus);
        navigate("/international");
    }

    return(
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
                        <select name="primaryInstitution" className="form-control" value={formData.primaryInstitution || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.grandholders?.map((primaryInstitution) => (
                                <option key={primaryInstitution.id} value={primaryInstitution.id}>{primaryInstitution.name}</option>
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
                    <button id="submit" type="submit" className="btn btn-primary">Додади</button>
                </form>
            </div>
        </div>
    )
}

export default InternationalProjectAdd;