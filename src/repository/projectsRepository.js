import axios from '../custom-axios/axios';


const ProjectRepository = {
    fetchCalls: () => {
        return axios.get("/scientificProjectCall/all")
    },
    fetchProfessors: () => {
        return axios.get("/professors/all")
    },
    fetchGrandholders: () => {
        return axios.get("/grantHolder/all")
    },

    fetchInternationalProjects: () => {
        return axios.get("/international/all")
    },
    fetchNationalProjects: () => {
        return axios.get("/national/all")
    },

    addCall: (name, acronym, endDate, typeScientificProjectCall, grantHolderName,grantHolderDescription, typeStatus) => {
        return axios.post("/scientificProjectCall/add", {
            "name": name,
            "acronym": acronym,
            "endDate": endDate,
            "typeScientificProjectCall": typeScientificProjectCall,
            "grantHolderName": grantHolderName,
            "grantHolderDescription":grantHolderDescription,
            "typeStatus": typeStatus
        });
    },

    addReport : (idProject, results, presentations, dateEntry, type) =>{
        return axios.post("/report/add", {
            "idProject": idProject,
            "results": results,
            "presentations": presentations,
            "dateEntry": dateEntry,
            "type":type
        });
    },

    fetchInternationalProjectsFiltered: (keyword) => {
        return axios.post(`/international/filterByKeyword?keyword=${keyword}`)
    },
    fetchNationalProjectsFiltered: (keyword) => {
        return axios.post(`/national/searchByNameOrKeyword?keyword=${keyword}`,)
    },

    fetchNationalProjectMmembers:  (id) =>{
      return axios.get(`national/project-members/${id}`);
    },

    deleteNationalProject: (id) => {
        return axios.delete(`/national/delete/${id}`);
    },

    editNationalProject: (id, name, dateEntry, callId, professor, typeStatus, keyWords, summary, benefits, members) => {
        console.log("Editing project with data:", {
            "name": name,
            "dateEntry": dateEntry,
            "callId": callId,
            "professor": professor,
            "typeStatus": typeStatus,
            "keyWords": keyWords,
            "summary": summary,
            "benefits": benefits,
            "members": members
        });
        return axios.put(`/national/edit/${id}`, {
            "name": name,
            "dateEntry": dateEntry,
            "callId": callId,
            "manager": professor,
            "typeStatus": typeStatus,
            "keyWords": keyWords,
            "summary": summary,
            "benefits": benefits,
            "members": members
        });
    },
    editInternationalProject: (id, name, type, startDate, endDate, primaryInstitution, typeStatus, description, goals, anotherInstitution, carrier, partners) => {
        console.log("Editing project with data:", {
            "name": name,
            "type": type,
            "startDate": startDate,
            "endDate": endDate,
            "primaryInstitution":primaryInstitution,
            "typeStatus": typeStatus,
            "description": description,
            "goals": goals,
            "anotherInstitution": anotherInstitution,
            "carrier": carrier,
            "partners": partners
        });
        return axios.put(`/international/edit/${id}`, {
            "name": name,
            "type": type,
            "startDate": startDate,
            "endDate": endDate,
            "primaryInstitution":primaryInstitution,
            "typeStatus": typeStatus,
            "description": description,
            "goals": goals,
            "anotherInstitution": anotherInstitution,
            "carrier": carrier,
            "partners": partners
        });
    },
    addNationalProject: (name, dateEntry, callId, managerId, typeStatus, keyWords, summary, benefits, members) => {
        return axios.post("/national/add", {
            name,
            dateEntry,
            callId,
            manager: managerId,
            typeStatus,
            keyWords,
            summary,
            benefits,
            members
        });
    },

    addInternationalProject: (name, type, dateEntry, startDate, endDate, primaryInstitution, typeStatus, description, goals, anotherInstitution, carrier, partners) => {
        return axios.post("/international/add", {
            name,
            type,
            dateEntry,
            startDate,
            endDate,
            primaryInstitution,
            typeStatus,
            description,
            goals,
            anotherInstitution,
            carrier,
            partners
        });
    },
    getNationalProject: (id) => {
        return axios.get(`/national/${id}`);
    },
    getInternationalProject: (id) => {
        return axios.get(`/international/${id}`);
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
    finishNationalProject: (projectId) => {
        return axios.post(`/national/finish/${projectId}`);
    },
    finishInternationalProject: (projectId) => {
        return axios.post(`/international/finish/${projectId}`)
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

    fetchNationalProjectReport: (date) => {

        console.log(date);
        return axios.get("national/report",
            {
                responseType: 'blob',
                params: { date: date }
            }).then(response => {
            if (response.status === 404) {
                // Do nothing or handle the error in a suitable way
                console.log("Report not found");
                return; // Exit the function
            }


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
    fetchInternationalProjectReport: (date) => {

        return axios.get("international/report",
            {
                responseType: 'blob',
                params: { date: date }
            }).then(response => {
            if (response.status === 404) {
                // Do nothing or handle the error in a suitable way
                console.log("Report not found");
                return; // Exit the function
            }

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



    fetchProjectCallById: (id) => {
        return axios.get(`/scientificProjectCall/${id}`);
    },
    fetchNationalProjectByCall:(callId) =>{
        return axios.post(`/national/filterByCallOrStatus?callId=${callId}`)
    }

}
export default ProjectRepository;