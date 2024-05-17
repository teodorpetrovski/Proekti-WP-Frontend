import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

function InternationalDetails({ fetchDetails, internationalProject }) {
    const { projectId } = useParams();

    useEffect(() => {
        if (!internationalProject || internationalProject.id !== projectId) {
            fetchDetails(projectId);

        }
    }, [projectId, internationalProject, fetchDetails]);

    if (!internationalProject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row m-3 bg-white" >
                <h3 style={{color: '#0dcaf0'}}>Информации за проект: {internationalProject.name}</h3>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Внесен на:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.dateEntry}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Почетен датум:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.startDate}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Краен датум:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.endDate}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Од кој тип е проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.type}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Кои се целите на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.goals}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Статус на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.typeStatus}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Главен финансиер на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.primaryGrantHolder?.name}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Останати финансиери на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.anotherGrantHolder?.name}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Носител на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.carrier?.name}</h6>
            </div>
            <div className="row ms-3 ">
                <h6 className="col-6 text-dark-50">Партнери кои се на проектот:</h6>
                <h6 className="col-6 text-black-50"> {internationalProject.partners?.name}</h6>
            </div>
            <div className="row ms-1 me-1">
                {/*<button type="submit" className="btn btn-info  ms-5 mt-3 col-3">*/}
                {/*    Напиши извештај*/}
                {/*</button>*/}
                {/*<Link*/}
                {/*    to={`/report/add?idProject=${projectId}&type=international`}*/}
                {/*    className="btn btn-info ms-5 mt-3 col-3"*/}
                {/*>Напиши извештај</Link>*/}
                <Link
                    to={`/report/add?idProject=${internationalProject.id}&type=international`}
                    className="btn btn-info ms-5 mt-3 col-3"
                >
                    Внеси извештај
                </Link>

            </div>
        </div>
    )
}

export default InternationalDetails
