import React, { useEffect } from "react"; // Import useEffect from React
import { useParams } from "react-router-dom";

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
        <div>
            {internationalProject && (
                <div>
                    <h1>Повеќе детали за проектот</h1>
                    <p>
                        <strong>Име:</strong> {internationalProject.name}
                    </p>
                    <p>
                        <strong>Тип:</strong> {internationalProject.type}
                    </p>
                    <p>
                        <strong>Цели:</strong> {internationalProject.goals}
                    </p>
                    <p>
                        <strong>Датум на внесување:</strong> {internationalProject.dateEntry}
                    </p>
                    <p>
                        <strong>Почетен датум:</strong> {internationalProject.startDate}
                    </p>
                    <p>
                        <strong>Краен ден:</strong> {internationalProject.endDate}
                    </p>
                    <p>
                        <strong>Главен финансиер:</strong> {internationalProject.primaryGrantHolder?.name}
                    </p>
                    <p>
                        <strong>Други финансиери:</strong> {internationalProject.anotherGrantHolder?.name}
                    </p>
                    <p>
                        <strong>Кариера:</strong> {internationalProject.carrier?.name}
                    </p>
                    <p>
                        <strong>Партнери:</strong> {internationalProject.partners?.name}
                    </p>
                    <p>
                        <strong>Статус:</strong> {internationalProject.typeStatus}
                    </p>
                    <p>
                        <strong>Одобрено:</strong> {internationalProject.approved ? "Yes" : "No"}
                    </p>
                </div>
            )}
        </div>
    )
}

export default InternationalDetails
