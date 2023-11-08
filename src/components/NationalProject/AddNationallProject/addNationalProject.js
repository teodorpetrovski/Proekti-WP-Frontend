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
        keyWords: "",
        summary: "",
        benefits: "",
        members: []
    })

    const TypeStatus = ["OLD", "NEW"];
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleMembersChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        updateFormData({
            ...formData,
            members: selectedOptions.map(option => option.value)
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const {
            name, dateEntry, callId, professorId, typeStatus,
            keyWords, summary, benefits, members
        } = formData;

        props.onAddNationalProject(name, dateEntry, callId, professorId, typeStatus, keyWords, summary, benefits, members);
        navigate("/national");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <h2>Додади национален проект</h2>
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
                               placeholder="Внесен на"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="callId">Повик:</label>
                        <select name="callId" className="form-control" value={formData.callId || ""} onChange={handleChange}>
                            <option value="">Избери повик</option>
                            {props.calls.map((call) => (
                                <option key={call.id} value={call.id}>{call.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Раководител на проектот:</label>
                        <select name="professorId" className="form-control" value={formData.professorId || ""} onChange={handleChange}>
                            <option value="">Избери раководител</option>
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
                            <option value="" disabled>Избери статус</option>
                            <option value="OLD">OLD</option>
                            <option value="NEW">NEW</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="keyWords">Клучни зборови:</label>
                        <input type="text"
                               className="form-control"
                               id="keyWords"
                               name="keyWords"
                               placeholder="Клучни зборови"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Заклучок/Резиме:</label>
                        <textarea className="form-control"
                                  id="summary"
                                  name="summary"
                                  placeholder="Заклучок/Резиме"
                                  onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="benefits">Придобивки:</label>
                        <textarea className="form-control"
                                  id="benefits"
                                  name="benefits"
                                  placeholder="Придобивки"
                                  onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="members">Членови:</label>
                        <select multiple={true}
                                className="form-control"
                                id="members"
                                name="members"
                                value={formData.members}
                                onChange={handleMembersChange}>
                            {props.professors?.map((professor) => (
                                <option key={professor.id} value={professor.id}>{professor.name}</option>
                            ))}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary mt-3">Додади</button>
                </form>
            </div>
        </div>
    )
}

export default NationalProjectAdd;