import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import RouteMap from "../Content/RouteMap";
import {getRouteData} from "../../../API/RouteDataAPI"

function RightContent({contentKey}) {

    const [routeData, setRouteData] = useState([])

    useEffect(() => {
        getRouteData().then(res => setRouteData(res));
    }, [])

    const mapStation = () => {
        let arr = [], routeMapData = {}


        if (routeData.length !== 0) {
            for (let i = 0; i < routeData.length; i++) {
                const station = routeData[i].station;

                for (let j = 0; j < station.length; j++) {
                    const firstStation = station[j];
                    const nextStation = station[j + 1];

                    if (nextStation) {
                        arr.push([firstStation.stationName, nextStation.stationName])
                    }
                }
            }
            routeMapData.data = arr;
        }

        return routeMapData;
    }

    // const mapStation = () => {
    //     let arr = [];
    //     getRouteData().then(res => {
    //         arr.push(res.flatMap(({station}) => {
    //             return station.reduce((segments, current, i, stations) => {
    //                 if (stations[i + 1]) {
    //                     segments.push([
    //                         current.stationName,
    //                         stations[i + 1].stationName
    //                     ]);
    //                 }
    //                 return segments;
    //             }, []);
    //         }))
    //     })
    //     console.log(arr)
    // }


    const content = (key) => {
        if (key === "map") {
            return <RouteMap mapRouteData={mapStation()}/>;
        }

        // {mapStation()}
        return null;
    }

    return (
        <Box className="rightPaper center">
            {content(contentKey)}
        </Box>
    );
}

export default RightContent;