import axios from '../custom-axios/axios';


const ProjectRepository = {
    fetchCalls: () => {
        return axios.get("/scientificProjectCall/all")
    },
    fetchManagers: () => {
        return axios.get("/grantHolder/all")
    },

    fetchInternationalProjects: () => {
        return axios.get("/international/all")
    },
    fetchNationalProjects: () => {
        return axios.get("/national/all")
    },

    addCall: (name, acronym, endDate, typeScientificProjectCall, grantHolder, typeStatus) => {
        return axios.post("/scientificProjectCall/add", {
            "name": name,
            "acronym": acronym,
            "endDate": endDate,
            "typeScientificProjectCall": typeScientificProjectCall,
            "grantHolder": grantHolder,
            "typeStatus": typeStatus
        });
    },

    fetchInternationalProjectsFiltered: (keyword) => {
        return axios.post(`/international/filterByKeyword?keyword=${keyword}`)
    },
    fetchNationalProjectsFiltered: (keyword) => {
        return axios.post(`/national/searchByNameOrKeyword?keyword=${keyword}`,)
    },

    deleteNationalProject: (id) => {
        return axios.delete(`/national/delete/${id}`);
    },

    editNationalProject: (id, name, dateEntry, callId, manager, typeStatus) => {
        console.log("Editing project with data:", {
            "name": name,
            "dateEntry": dateEntry,
            "callId": callId,
            "manager": manager,
            "typeStatus": typeStatus
        });
        return axios.put(`/national/edit/${id}`, {
            "name": name,
            "dateEntry": dateEntry,
            "callId": callId,
            "manager": manager,
            "typeStatus": typeStatus
        });
    },
    getNationalProject: (id) => {
        return axios.get(`/national/${id}`);
    },

    deleteInternationalProject: (id) => {
        return axios.delete(`/international/delete/${id}`);
    },

    approveNationalProject: (id) => {
        return axios.post(`/national/approve/${id}`)
    },

    approveInternationalProject: (id) => {
        return axios.post(`/international/approve/${id}`)
    },

    exportInternationalProject: (id) => {
        return axios.get(`international/export/pdf/${id}`,
            {
                responseType: 'blob',
            }).then(response => {

            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'File.pdf');
            document.body.appendChild(link);
            link.click();


            window.URL.revokeObjectURL(url);
        });
    },
    exportNationalProject: (id) => {
        return axios.get(`national/export/pdf/${id}`,
            {
                responseType: 'blob',
            }).then(response => {

            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const url = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'File.pdf');
            document.body.appendChild(link);
            link.click();


            window.URL.revokeObjectURL(url);
        });
    },

}
export default ProjectRepository;