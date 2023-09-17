import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080/api/projects',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': ' Content-Type, X-Auth-Token, Origin, Authorization'
    }
})

export default instance;