// import React, {useEffect, useState} from 'react';
// import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
// import dayjs from 'dayjs';

// function Timetable({routeData, currentRoute}) {

//     const [routeObj, setRouteObj] = useState({});
//     const [routeTrainNum, setRouteTrainNum] = useState();
//     const [routeStations, setRouteStations] = useState([]);
//     const [durationSToS, setDurationSToS] = useState();
//     const [trainInterval, setTrainInterval] = useState();

//     useEffect(() => {
//         let arr = (routeData.filter(route => route['routeTitle'] === currentRoute));
//         let stations = [];
//         stations.push(arr.flatMap(({station}) => {
//             return station.reduce((segments, current,) => {
//                     segments.push({
//                         name: current.stationName,
//                         departTime: current.stationDeparture
//                     });
//                 return segments;
//             }, []);
//         }))

//         setRouteObj(arr[0]);
//         setRouteTrainNum(arr[0].routeTrainNum);
//         setRouteStations(stations[0]);
//         setDurationSToS(5)
//         setTrainInterval(5)
//     }, [routeData, currentRoute])

//     console.log(routeObj, routeTrainNum, routeStations)

//     return (
//         <TableContainer sx={{maxHeight: 440}} className="default-font">
//             <Box className="timetableCurrentTitle blueFont bold">
//                 {currentRoute}
//             </Box>

//             <Table
//                 // stickyHeader
//                 // aria-label="sticky table"
//                 size={'small'}
//             >
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Trip Order</TableCell>
//                         {/*{routes.map((item) => (*/}
//                         {/*    <TableCell key={item.id}>{item.id}</TableCell>*/}
//                         {/*))*/}
//                         {/*}*/}
//                         {/*<TableCell>Time taken(s)</TableCell>*/}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         // station.map((item) => (
//                         //     <TableRow key={item.id}>
//                         //         <TableCell>{item.stationName}</TableCell>
//                         //         <TableCell>{item.stationDeparture}</TableCell>
//                         //         <TableCell>8:10:00</TableCell>
//                         //         <TableCell>8:20:00</TableCell>
//                         //     </TableRow>
//                         // ))
//                     }
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

// export default Timetable;