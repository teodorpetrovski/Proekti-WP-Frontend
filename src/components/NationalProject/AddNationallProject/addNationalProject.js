// import React from 'react';
// import {useHistory} from 'react-router-dom';
//
// const AddNationalProject = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         dateEntry: '',
//         typeStatus: '',
//         keyWords: '',
//         summary: '',
//         benefits: '',
//         // Add more fields from NationalProject class...
//         // Example:
//         members: '',
//         manager: '',
//         scientificProjectCall: '',
//         approved: false,
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/national-projects/add', formData);
//             console.log(response.data); // Handle success or error here
//         } catch (error) {
//             console.error('Error creating National Project:', error);
//         }
//     };
//
//     return (
//         <div className="container">
//             <h2>Add National Project</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="dateEntry">Date Entry</label>
//                     <input
//                         type="date"
//                         className="form-control"
//                         id="dateEntry"
//                         name="dateEntry"
//                         value={formData.dateEntry}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="typeStatus">Type Status</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="typeStatus"
//                         name="typeStatus"
//                         value={formData.typeStatus}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="keyWords">Keywords</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="keyWords"
//                         name="keyWords"
//                         value={formData.keyWords}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="summary">Summary</label>
//                     <textarea
//                         className="form-control"
//                         id="summary"
//                         name="summary"
//                         value={formData.summary}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="benefits">Benefits</label>
//                     <textarea
//                         className="form-control"
//                         id="benefits"
//                         name="benefits"
//                         value={formData.benefits}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 {/* Add fields for members, manager, scientificProjectCall, and approved */}
//                 <div className="form-group">
//                     <label htmlFor="members">Members</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="members"
//                         name="members"
//                         value={formData.members}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="manager">Manager</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="manager"
//                         name="manager"
//                         value={formData.manager}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="scientificProjectCall">Scientific Project Call</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="scientificProjectCall"
//                         name="scientificProjectCall"
//                         value={formData.scientificProjectCall}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="approved">Approved</label>
//                     <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="approved"
//                         name="approved"
//                         checked={formData.approved}
//                         onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default AddNationalProject;
