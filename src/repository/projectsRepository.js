import axios from '../custom-axios/axios';


const ProjectRepository = {
    fetchCalls: () => {
        return axios.get("/scientificProjectCall/all")
    },

    fetchHomeProjects:()=> {
        return axios.get("/home")
    },
    fetchInternationalProjects:()=> {
        return axios.get("/international/all")
    },
    fetchNationalProjects:()=> {
        return axios.get("/national/all")
    },

    deleteProject: (id) => {
        return axios.delete(`/project/delete/${id}`);
    },


    exportInternationalProject: (id) => {
        return axios.get(`international//export/pdf/${id}`,
            {
            responseType: 'blob',
        }).then(response => {

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
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
        return axios.get(`national//export/pdf/${id}`,
            {
                responseType: 'blob',
            }).then(response => {

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);


            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'File.pdf');
            document.body.appendChild(link);
            link.click();


            window.URL.revokeObjectURL(url);
        });
    },

    exportAllProject: (id) => {
        return axios.get(`all//export/pdf/${id}`,
            {
                responseType: 'blob',
            }).then(response => {

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
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