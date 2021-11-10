import React, {useState} from 'react';
import {Box} from "@mui/material";
import RouteMap from "../Content/RouteMap";
import * as RouteDataAPI from '../../../API/RouteDataAPI';

function RightContent({contentKey}) {

    const [routeData, setRouteData] = useState([])

    // RouteDataAPI.getRouteData().then((res) => {
    //     let arr = [];
    //     res.forEach((route) => {
    //         route.station.forEach((station) =>{
    //             arr.push( station.stationName)
    //         })
    //     })
    //     setRouteData(arr);
    // })

    console.log(routeData)
    const content = (key) => {
        if (key === "map") return <RouteMap/>
        return null;
    }


    return (
        <Box className="rightPaper center">
            {content(contentKey)}

        </Box>
    );
}

export default RightContent;