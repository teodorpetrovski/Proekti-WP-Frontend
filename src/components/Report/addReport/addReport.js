import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddReport = (props) => {
    const navigate = useNavigate();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, updateFormData] = React.useState({
        idProject: '',
        results: '',
        presentations: '',
        dateEntry: getCurrentDate(),
        type: '',
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const idProject = formData.idProject;
        const results = formData.results;
        const presentations = formData.presentations;
        const dateEntry = formData.dateEntry;
        const type = formData.type;
        props.onAdd(
            idProject,
            results,
            presentations,
            dateEntry,
            type
        )
        navigate("/calls");
    };

    return (
        <div className="row m-5">
            <div className="col-md-5" style={{ marginLeft: '300px'}}>

                <h3 className="text-black-50">Напиши извештај</h3>
                <p className="mb-3 text-info fw-bold">Информации за извештај</p>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group mt-5">
                        <label className="fw-bold text-black-50">Датум на поднесување на извештај</label>
                        <input
                            id="entryDateInput"
                            type="date"
                            className="form-control"
                            name="dateEntry"
                            value={formData.dateEntry}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Резултати:</label>
                        <textarea className="form-control"
                                  id="results"
                                  name="results"
                                  required
                                  placeholder="Резултати"
                                  onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Презентација:</label>
                        <textarea className="form-control"
                                  id="presentations"
                                  name="presentations"
                                  required
                                  placeholder="Презентација"
                                  onChange={handleChange}>
                        </textarea>
                    </div>

                    <div className="row ms-1 me-1">
                        <button type="submit" className="btn btn-info mt-3">
                            Зачувај
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReport;
