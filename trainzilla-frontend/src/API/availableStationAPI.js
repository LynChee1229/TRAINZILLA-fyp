import axios from 'axios'

export function getStationData() {
    //API Call here

    const baseURL = 'http://localhost:8000/api'
    let allStation = []

    // Make a request for a user with a given ID

     axios
        .get(`${baseURL}/getAvailableStation`)
        .then(function (response) {
            // handle success
            let dataArr = response.data
            dataArr.forEach((data) => {
                if (!allStation.some((e) => e === data.stationName)) {
                    allStation.push(data.stationName)
                }
            })

            allStation.sort();
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })

    return allStation
}
