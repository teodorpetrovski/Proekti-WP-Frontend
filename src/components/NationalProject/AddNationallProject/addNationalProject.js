import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const NationalProjectAdd = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        dateEntry: "",
        callId: null,
        professorId: 0,
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
        const dateEntry = formData.dateEntry;
        const callId = formData.callId;
        const professorId = formData.professorId;
        const typeStatus = formData.typeStatus;
        
        props.onAddNationalProject(name, dateEntry, callId, professorId, typeStatus);
        navigate("/national");
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
                        <label htmlFor="dateEntry">Внесен на:</label>
                        <input type="date"
                               className="form-control"
                               id="dateEntry"
                               name="dateEntry"
                               placeholder="Датум"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="callId">Повик:</label>
                        <select name="callId" className="form-control" value={formData.callId || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.calls.map((call) => (
                                <option key={call.id} value={call.id}>{call.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Раководител на проектот:</label>
                        <select name="professorId" className="form-control" value={formData.professorId || ""} onChange={handleChange}>
                            <option value="">None</option>
                            {props.professors?.map((professor) => (
                                <option key={professor.id} value={professor.id}>{professor.name}</option>
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

export default NationalProjectAdd;