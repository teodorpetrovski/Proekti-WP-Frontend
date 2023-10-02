import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditNationalProjectForm = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        dateEntry: "",
        call: "",
        manager: "",
        typeStatus: ""
    });

    const TypeScientificProjectCall = ["OPENED", "CLOSED"];
    const TypeStatus = ["OLD", "NEW"];

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const name = formData.name !== "" ? formData.name : props.project.name;
        const dateEntry = formData.dateEntry !== "" ? formData.dateEntry : props.project.dateEntry;
        const call = formData.call !== "" ? formData.call : props.project.call;
        const manager = formData.manager !== "" ? formData.manager : props.project.manager;
        const typeStatus = formData.typeStatus !== "" ? formData.typeStatus : props.project.typeStatus;

        props.onEditNatProject(props.project.id, name, dateEntry, call, manager, typeStatus);
        navigate('/nationalprojects');
    }

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
                               placeholder={props.project ? props.project.name : ""}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateEntry">Внесен на:</label>
                        <input type="text"
                               className="form-control"
                               id="dateEntry"
                               name="dateEntry"
                               placeholder={props.project ? props.project.dateEntry : ""}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Повик:</label>
                        <select name="call" className="form-control" onChange={handleChange}>
                            {TypeScientificProjectCall.map((call, index) => (
                                <option key={index} value={call}>{call}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="manager">Раководител на проектот:</label>
                        <input type="text"
                               className="form-control"
                               id="manager"
                               name="manager"
                               placeholder={props.project && props.project.manager ? props.project.manager.name : ""}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Статус:</label>
                        <select name="typeStatus" className="form-control" onChange={handleChange}>
                            {TypeStatus.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Уреди</button>
                </form>
            </div>
        </div>
    );
}

export default EditNationalProjectForm;
