import axios from 'axios'

export async function getTimeTable(currentID) {
    //API Call here

    let obj = {}

    const baseURL = 'http://localhost:8000/api'
    const payload = { id: currentID }

    await axios
        .post(`${baseURL}/getTimeTable`, payload)
        .then(function (response) {
            // handle success
            const {routeID, routeTitle, routeStatus, ...rest} = response.data;
            obj = rest;
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })

    return (obj)
}
