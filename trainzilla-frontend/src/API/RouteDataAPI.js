import axios from 'axios';

export const getRouteData = () => {
    const URL = `http://localhost:8000/api/getRouteData`;
    return axios(URL, {
        method: 'GET'
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};