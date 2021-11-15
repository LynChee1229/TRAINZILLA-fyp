import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

function Timetable({routeData, currentRoute}) {

    console.log(routeData, currentRoute)

    const [routeObj, setRouteObj] = useState({});


    useEffect(()=>{
        let arr = (routeData.filter(route => route.routeTitle === currentRoute));
        setRouteObj(arr[0])
    },[])

    return (
        <TableContainer sx={{maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead style={{color: 'pink'}}>
                    <TableRow>
                        <TableCell>Trip Order</TableCell>
                        {/*{routes.map((item) => (*/}
                        {/*    <TableCell key={item.id}>{item.id}</TableCell>*/}
                        {/*))*/}
                        {/*}*/}
                        {/*<TableCell>Time taken(s)</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        // station.map((item) => (
                        //     <TableRow key={item.id}>
                        //         <TableCell>{item.stationName}</TableCell>
                        //         <TableCell>{item.stationDeparture}</TableCell>
                        //         <TableCell>8:10:00</TableCell>
                        //         <TableCell>8:20:00</TableCell>
                        //     </TableRow>
                        // ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Timetable;