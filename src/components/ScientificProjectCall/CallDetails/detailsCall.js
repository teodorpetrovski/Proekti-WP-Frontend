import React from 'react';

const DetailsCall = ({ call }) => {
    if (!call) {
        return <div>Select a call to view details.</div>;
    }
    return (
        <div>
            <h2>Повеќе информации за повикот</h2>
            <ul>
                <li><strong>Име:</strong> {call.name}</li>
                <li><strong>Акроним:</strong> {call.acronym}</li>
                <li><strong>Краен датум:</strong> {call.endDate}</li>
                <li><strong>Тип на повик:</strong> {call.typeScientificProjectCall}</li>
                <li><strong>Финансиер:</strong> {call.grantHolder.name}</li>
                <li><strong>Тип на статус:</strong> {call.typeStatus}</li>
            </ul>
        </div>
    );
};
export default DetailsCall;