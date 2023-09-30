import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddCall = (props) => {
    const navigate =useNavigate();
    const [formData, updateFormData] =React.useState({
        name: '',
        acronym: '',
        endDate: '',
        typeScientificProjectCall: '',
        grantHolder: '',
        typeStatus: '',
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const acronym = formData.acronym;
        const endDate = formData.endDate;
        const typeScientificProjectCall = formData.typeScientificProjectCall;
        const grantHolder = formData.grantHolder;
        const typeStatus = formData.typeStatus;
        props
            .onAddCall(
                name,
                acronym,
                endDate,
                typeScientificProjectCall,
                grantHolder,
                typeStatus
            )
            navigate("/calls");
    };

    return(
        <div className="container mt-5">
            <h3>Додади Повик</h3>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label>Име:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Акроним:</label>
                    <input
                        type="text"
                        name="acronym"
                        value={formData.acronym}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Краен датум:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Тип на повик:</label>
                    <select
                        name="typeScientificProjectCall"
                        value={formData.typeScientificProjectCall}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="OPENED">OPENED</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Финансиер:</label>
                    <input
                        type="text"
                        name="grantHolder"
                        value={formData.grantHolder}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                <label>Тип на статус:</label>
                    <select
                        name="typeStatus"
                        value={formData.typeStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="OLD">OLD</option>
                        <option value="NEW">NEW</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">
                    Додади повик!
                </button>
            </form>
        </div>
    )
}
export default AddCall;
