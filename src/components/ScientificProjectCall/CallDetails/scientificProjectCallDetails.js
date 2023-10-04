// import React from 'react';
//
// const ScientificProjectCallDetails = ({ call }) => {
//     if (!call) {
//         return <div>Select a call to view details.</div>;
//     }
//     return (
//         <div>
//             <h2>Повеќе информации за повикот</h2>
//             <ul>
//                 <li><strong>Име:</strong> {call.name}</li>
//                 <li><strong>Акроним:</strong> {call.acronym}</li>
//                 <li><strong>Краен датум:</strong> {call.endDate}</li>
//                 <li><strong>Тип на повик:</strong> {call.typeScientificProjectCall}</li>
//                 <li><strong>Финансиер:</strong> {call.grantHolder.name}</li>
//                 <li><strong>Тип на статус:</strong> {call.typeStatus}</li>
//             </ul>
//         </div>
//     );
// };
// export default ScientificProjectCallDetails;
import React, { Component } from 'react';
import ProjectRepository from '../../../repository/projectsRepository';
import DetailsCall from "./detailsCall";

class ScientificProjectCallDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            call: null,
        };
    }

    componentDidMount() {
        const { callId } = this.props.match.params;

        // Fetch call details using the callId
        ProjectRepository.fetchCallDetails(callId)
            .then((response) => {
                this.setState({ call: response.data });
            })
            .catch((error) => {
                console.error('Error fetching call details', error);
            });
    }

    render() {
        const { call } = this.state;

        if (!call) {
            return <div>Select a call to view details.</div>;
        }

        return (
            <div>
                <h2>Call Details</h2>
                {/* Render the ScientificProjectCallDetails component with the call data */}
                <DetailsCall call={call} />
            </div>
        );
    }
}

export default ScientificProjectCallDetails;