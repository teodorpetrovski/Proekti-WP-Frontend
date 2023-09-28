import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCall = () => {
<<<<<<< HEAD
    const history = useNavigate();
=======
    const navigate = useNavigate();
>>>>>>> f83b7cc3ec4a57b5e1bb5e06a3335c5e5346b448
    const [grantHolders, setGrantHolders] = useState([]);
    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');
    const [financier, setFinancier] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get('/api/projects/grantHolder/all')
            .then(response => {
                setGrantHolders(response.data);
            })
            .catch(error => {
                console.error("Error fetching grant holders", error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const callData = {
            name: name,
            acronym: acronym,
            endDate: endDate,
            typeScientificProjectCall: type,
            grantHolderId: financier,
            typeStatus: status
        };

        axios.post('/api/projects/scientificProjectCall/add', callData)
            .then(response => {
                console.log("Successfully added", response.data);
                navigate("/calls");
                setName('');
                setAcronym('');
                setEndDate('');
                setType('');
                setFinancier('');
                setStatus('');
            })
            .catch(error => {
                console.error("Error adding call", error);
            });
    };

    return (
        <div className="container mt-5">
            <h3>Внес на нов повик</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Опис на повикот</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Акроним</label>
                    <input type="text" className="form-control" value={acronym} onChange={e => setAcronym(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Тип на повикот</label>
                    <select className="form-select" value={type} onChange={e => setType(e.target.value)} required>
                        <option value="">Select...</option>
                        <option value="OPENED">OPENED</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Финансиер на повикот</label>
                    <select className="form-select" value={financier} onChange={e => setFinancier(e.target.value)} required>
                        <option value="">Select...</option>
                        {grantHolders.map(holder => <option key={holder.id} value={holder.id}>{holder.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Краен рок</label>
                    <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Статус на повикот</label>
                    <select className="form-select" value={status} onChange={e => setStatus(e.target.value)} required>
                        <option value="">Select...</option>
                        <option value="OLD">OLD</option>
                        <option value="NEW">NEW</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-success w-100">Зачувај</button>
                </div>
            </form>
        </div>
    );
}

export default AddCall;
