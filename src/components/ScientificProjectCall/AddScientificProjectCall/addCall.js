import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddCall = (props) => {
    const navigate =useNavigate();
    const [formData, updateFormData] =React.useState({
        name: '',
        acronym: '',
        endDate: '',
        typeScientificProjectCall: '',
        grantHolderName: '',
        grantHolderDescription: '',
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
        const grantHolderName=formData.grantHolderName;
        const grantHolderDescription=formData.grantHolderDescription;
        const typeStatus = formData.typeStatus;
        props
            .onAdd(
                name,
                acronym,
                endDate,
                typeScientificProjectCall,
                grantHolderName,
                grantHolderDescription,
                typeStatus
            )
            navigate("/calls");
    };

    return(
            <div className="row mt-5">
                <div className="col-md-5">
                    <h1>Додади повик</h1>
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Име:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                placeholder="Име на повик"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="acronym">Акроним:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="acronym"
                                value={formData.acronym}
                                placeholder="Акроним на повик"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Краен датум:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Тип на повик:</label>
                            <select
                                className="form-control"
                                name="typeScientificProjectCall"
                                value={formData.typeScientificProjectCall}
                                onChange={handleChange}
                                required
                            >
                                <option value="Одбери тип">Одбери тип</option>
                                <option value="OPENED">OPENED</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Име на финансиер:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Име на финансиер"
                                name="grantHolderName"
                                value={formData.grantHolderName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Опис на финансиер:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Опис на финансиер"
                                name="grantHolderDescription"
                                value={formData.grantHolderDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Тип на статус:</label>
                            <select
                                name="typeStatus"
                                className="form-control"
                                value={formData.typeStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Одбери тип</option>
                                <option value="OLD">OLD</option>
                                <option value="NEW">NEW</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success mt-3">
                            Додади повик
                        </button>
                    </form>
                </div>
            </div>



        // {/*</div>*/}
    )
}
export default AddCall;
