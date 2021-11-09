import axios from "axios";

export function getRouteData() {
    return axios.get("http://localhost:8000/api/getRouteData")
        .catch(function (error){
            console.log(error)
        })
}