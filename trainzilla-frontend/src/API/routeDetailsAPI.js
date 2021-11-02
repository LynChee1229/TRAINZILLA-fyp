export function getRoutesDetails(
    departStation,
    arriveStation,
    currentTimestamp
) {
    //API call here
    const routeDetails = {
        departureStation: departStation,
        arrivalStation: arriveStation,
        routes: [
            {
                totalTimeTaken: '15 minutes',
                timeArrivalByStation: [
                    {
                        stationName: 'Station 1',
                        timeArrive: currentTimestamp + 500,
                    },
                    {
                        stationName: 'Station 3',
                        timeArrive: currentTimestamp + 1000,
                    },
                    {
                        stationName: 'Station 5',
                        timeArrive: currentTimestamp + 1500,
                    },
                ],
            },
            {
                totalTimeTaken: '20 minutes',
                timeArrivalByStation: [
                    {
                        stationName: 'Station 1',
                        timeArrive: currentTimestamp + 500,
                    },
                    {
                        stationName: 'Station 2',
                        timeArrive: currentTimestamp + 1000,
                    },
                    {
                        stationName: 'Station 4',
                        timeArrive: currentTimestamp + 1500,
                    },
                    {
                        stationName: 'Station 5',
                        timeArrive: currentTimestamp + 2000,
                    },
                ],
            },
            {
                totalTimeTaken: '25 minutes',
                timeArrivalByStation: [
                    {
                        stationName: 'Station 1',
                        timeArrive: currentTimestamp + 500,
                    },
                    {
                        stationName: 'Station 2',
                        timeArrive: currentTimestamp + 1000,
                    },
                    {
                        stationName: 'Station 3',
                        timeArrive: currentTimestamp + 1500,
                    },
                    {
                        stationName: 'Station 4',
                        timeArrive: currentTimestamp + 2000,
                    },
                    {
                        stationName: 'Station 5',
                        timeArrive: currentTimestamp + 2500,
                    },
                ],
            },
        ],
    }

    return routeDetails;
}
