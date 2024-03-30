import React, { useEffect } from "react"; // Import useEffect from React
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

function NationalDetails({ fetchDetails, nationalProject,  exportNationalProjectMembers, nationalProjectMembers }) {
    const { projectId } = useParams();

    useEffect(() => {
        if (!nationalProject || nationalProject.id !== projectId) {
            fetchDetails(projectId);
            exportNationalProjectMembers(projectId);
        }
    }, [projectId, nationalProject, fetchDetails, exportNationalProjectMembers]);

    if (!nationalProject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row m-3 bg-white" >
                <h3 style={{color: '#0dcaf0'}}>Информации за проект: {nationalProject.name}</h3>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Внесен на:</h6>
                <h6 className="col-6 text-black-50"> {nationalProject.dateEntry}</h6>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Клучни зборови (мак.) - Одалечувањети на зборови е со запирка:</h6>
                <h6 className="col-6 text-black-50"> {nationalProject.keyWords}</h6>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Резиме на проектот што јасно ги опишува целите на проектот:</h6>
                <h6 className="col-6 text-black-50"> {nationalProject.summary}</h6>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Досегашни публикации или проекти на членови на тимот:</h6>
                <div className="col-6">
                    <ul style={{ listStyleType: 'none' }}>
                        {nationalProjectMembers?.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>

                </div>


            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Очекувани придобивки и резултати:</h6>
                <h6 className="col-6 text-black-50"> {nationalProject.benefits}</h6>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Членови:</h6>
                <div className="col-6 text-black-50">
                    <ul>
                        {nationalProject.members.map(professor => (
                            <li key={professor.id}>{professor.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <h6 className="col-6 text-dark-50">Раководител на проект:</h6>
                <h6 className="col-6 text-black-50"> {nationalProject.manager ? nationalProject.manager?.name : 'N/A'} </h6>
            </div>
            <div className="row ms-1 me-1">
                {/*<button type="submit" className="btn btn-info  ms-5 mt-3 col-3">*/}
                {/*    Напиши извештај*/}
                {/*</button>*/}
                <Link
                    to={`/report/add?idProject=${projectId}&type=national`}
                    className="btn btn-info ms-5 mt-3 col-3"
                >Внеси извештај</Link>
            </div>
        </div>
    )
}

export default NationalDetails
