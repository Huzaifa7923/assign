import axios from 'axios'
import { baseURL,projectId,environmentId } from '../constants';

const api=axios.create({
    baseURL:baseURL,
    headers:{
        'projectId':projectId,
        'environmentId':environmentId
    }
})

export default api;