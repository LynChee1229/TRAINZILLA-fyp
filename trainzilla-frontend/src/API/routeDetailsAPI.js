export async function getRoutesDetails( departStation, arriveStation, currentTimestamp) 
{
    let item = {
        departStation: departStation,
        arriveStation: arriveStation,
    };

    let routeDetails = await fetch("http://localhost:8000/api/getRouteSuggestion", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });

    routeDetails = await routeDetails.json();
    return routeDetails;
}
