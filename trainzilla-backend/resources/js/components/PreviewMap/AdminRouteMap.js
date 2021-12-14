import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react'
import {getRouteData} from "./RouteDataAdminAPI";
import RouteMap from "./RouteMap";

const AdminRouteMap = () => {

    const [routeData, setRouteData] = useState([]);

    useEffect(() => {
        getRouteData().then(res => setRouteData(res));
    }, [])

    const mapStation = () => {
        let arr = [], allStation = [], routeMapData = {}, routesNameStation = {};

        if (routeData.length !== 0) {
            for (let i = 0; i < routeData.length; i++) {
                const title = routeData[i].routeTitle;
                const station = routeData[i].station;
                const routeStation = [];

                for (let j = 0; j < station.length; j++) {
                    const firstStation = station[j];
                    const nextStation = station[j + 1];

                    allStation.push(firstStation.stationName);
                    routeStation.push(firstStation.stationName);

                    if (nextStation) {
                        arr.push([firstStation.stationName, nextStation.stationName])
                    }
                }
                routesNameStation[title] = routeStation;
            }
            routeMapData.data = arr;
            routeMapData.allStation = allStation;
            routeMapData.routeNameStation = routesNameStation;
            routeMapData.centralStation = "KL Sentral"
        }
        return routeMapData;
    }

    const content = (key) => {
        if (
            key === 'map'
            && !_.isEmpty(mapStation())
        ){
            return <RouteMap mapRouteData={mapStation()}/>;
        } else {
            return null;
        }

    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh'
        }}>
            {content('map')}
        </div>
    );
}

export default AdminRouteMap;

if (document.getElementById('adminMap')) {
    ReactDOM.render(<AdminRouteMap/>, document.getElementById('adminMap'));
}
