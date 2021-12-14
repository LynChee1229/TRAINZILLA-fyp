import axios from "axios";

export async function getRouteData() {
    let result = [];
    await axios.get('http://localhost:8000/api/getRouteData')
        .then (res => {
            result = res
        })
        .catch(error => {
            throw error;
        });
    return (result.data);
}
