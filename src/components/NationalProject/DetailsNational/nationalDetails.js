import React, { useEffect } from "react"; // Import useEffect from React
import { useParams } from "react-router-dom";

function NationalDetails({ fetchDetails, nationalProject }) {
    const { projectId } = useParams();

    useEffect(() => {
        if (!nationalProject || nationalProject.id !== projectId) {
            fetchDetails(projectId);
        }
    }, [projectId, nationalProject, fetchDetails]);

    if (!nationalProject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Повеќе детали за национален проект</h1>
            <div>

                <h2>{nationalProject.name}</h2>
                <p>Внесен на: {nationalProject.dateEntry}</p>
                <p>Повик: {nationalProject.scientificProjectCall?.name}</p>
                <p>Клучни зборови: {nationalProject.keyWords}</p>
                <p>Заклучок/Резиме: {nationalProject.summary}</p>
                <p>Придобивки: {nationalProject.benefits}</p>
                <p>Одобрено: {nationalProject.approved ? 'Yes' : 'No'}</p>
                <p>Раководител на проект: {nationalProject.manager ? nationalProject.manager?.name : 'N/A'}</p>

                <h3>Членови:</h3>
                <ul>
                    {nationalProject.members?.map((member) => (
                        <li key={member.id}>{member?.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NationalDetails
