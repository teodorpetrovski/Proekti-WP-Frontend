import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomListGroup from '../../Home/CustomListGroup';


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
    const menuItems = [
        { text: 'Сите проекти', link: '/' },
        { text: 'Мои проекти', link: '#' },
        { text: 'Нов повик', link: '/calls/add' },
        { text: 'Управување на проекти', link: '#' },
    ];

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
            <CustomListGroup items={menuItems} />
            <div className="col-md-5" style={{marginLeft:'300px', marginTop:'-180px'}}>
                
                <h3 className="text-black-50">Внес на нов повик</h3>
                <p className="mb-3 ms-1 text-black-50">Опис на повикот</p>
                <p className="mb-3 text-success fw-bold">Информации за повикот</p>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="fw-bold text-black-50">Име *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            placeholder="Максимум 255 карактери"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="acronym" className="fw-bold text-black-50">Акроним *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="acronym"
                            value={formData.acronym}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-bold text-black-50">Краен рок за аплицирање *</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-bold text-black-50">Тип на повик *</label>
                        <select
                            className="form-control"
                            name="typeScientificProjectCall"
                            value={formData.typeScientificProjectCall}
                            onChange={handleChange}
                            required
                        >
                            <option value="-Избери-">-Избери-</option>
                            <option value="OPENED">OPENED</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-bold text-black-50">Име на финансиер *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="grantHolderName"
                            value={formData.grantHolderName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-bold text-black-50">Опис на финансиер *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="grantHolderDescription"
                            value={formData.grantHolderDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-bold text-black-50">Тип на статус *</label>
                        <select
                            name="typeStatus"
                            className="form-control"
                            value={formData.typeStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="-Избери-">-Избери-</option>
                            <option value="OLD">OLD</option>
                            <option value="NEW">NEW</option>
                        </select>
                    </div>
                    <div className="row ms-1 me-1">
                        <button type="submit" className="btn btn-success mt-3">
                            Зачувај
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddCall;
