import React, { useEffect } from "react"; // Import useEffect from React
import { useParams } from "react-router-dom";

function NationalDetails({ fetchNationalProjectDetails, nationalProject }) {
    const { projectId } = useParams();

    useEffect(() => {
        if (!nationalProject || nationalProject.id !== projectId) {
            fetchNationalProjectDetails(projectId);
        }
    }, [projectId, nationalProject, fetchNationalProjectDetails]);

    if (!nationalProject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Повеќе детали за национален проект</h1>
            <div>

                <h2>{nationalProject.name}</h2>
                <p>Внесен на: {nationalProject.dateEntry}</p>
                <p>Повик: {nationalProject.scientificProjectCall.name}</p>
                <p>Клучни зборови: {nationalProject.keyWords}</p>
                <p>Заклучок/Резиме: {nationalProject.summary}</p>
                <p>Придобивки: {nationalProject.benefits}</p>
                <p>Одобрено: {nationalProject.approved ? 'Yes' : 'No'}</p>
                <p>Раковосител на проекр: {nationalProject.manager ? nationalProject.manager.name : 'N/A'}</p>

                <h3>Членови:</h3>
                <ul>
                    {nationalProject.members.map((member) => (
                        <li key={member.id}>{member.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NationalDetails

// const NationalDetails = ({project}) => {
//     console.log(item, ' for car details')
//
//
//     const { id } = props.match.params
//
//
//     return (
//         <div className="container">
//                         <h1>National Project Details</h1>
//                          <div>
//                              <h2>{project.name}</h2>
//                              <p>Date Entry: {project.dateEntry}</p>
//                              <p>Scientific Project Call: {project.scientificProjectCall.name}</p>
//                              <p>Key Words: {project.keyWords}</p>
//                              <p>Summary: {project.summary}</p>
//                              <p>Benefits: {project.benefits}</p>
//                              <p>Approved: {project.approved ? 'Yes' : 'No'}</p>
//                              <p>Manager: {project.manager ? project.manager.name : 'N/A'}</p>
//                              <h3>Members:</h3>
//                              <ul>
//                                  {project.members.map((member) => (
//                         <li key={member.id}>{member.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }
//
// export default NationalDetails