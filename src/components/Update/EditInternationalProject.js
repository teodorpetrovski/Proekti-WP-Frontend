import React, {useState, useEffect} from "react";

const EditNationalProjectForm = ({projectId, onCancel}) => {
    const [project, setProject] = useState({
        name: "",
        dateEntry: "",
        call: "",
        manager: "",
        typeStatus: ""
    });

    useEffect(() => {
        fetch(`/api/projects/national/${projectId}`)
            .then(res => res.json())
            .then(data => setProject(data));
    }, [projectId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProject({...project, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/projects/national/edit/${projectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
        })
            .then(() => onCancel());
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Име на проектот:
                    <input type="text" name="name" value={project.name} onChange={handleInputChange}/>
                </label>
                <label>
                    Внесен на:
                    <input type="text" name="dateEntry" value={project.dateEntry} onChange={handleInputChange}/>
                </label>
                <label>
                    Повик:
                    <input type="text" name="call" value={project.call}  onChange={handleInputChange}/>
                </label>
                <label>
                    Раководидел на проектот:
                    <input type="text" name="manager" value={project.manager} onChange={handleInputChange}/>
                </label>
                <label>
                    Статус:
                    <input type="text" name="typeStatus" value={project.typeStatus} onChange={handleInputChange}/>
                </label>
                <button type="submit">Уреди</button>
                <button type="button" onClick={onCancel}>Откажи</button>
            </form>
        </div>
    );
};

export default EditNationalProjectForm;
