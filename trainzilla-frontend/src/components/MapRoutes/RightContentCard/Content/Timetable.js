import React, {useEffect, useState} from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {getTimeTable} from "../../../../API/getTimeTable";
import _ from 'lodash';

function Timetable({routeData, currentRoute}) {

    const [currRouteId, setCurrRouteId] = useState();
    const [timetableData, setTimetableData] = useState({});

    useEffect(() => {
        let arr = (routeData.filter(route => route['routeTitle'] === currentRoute));
        setCurrRouteId(arr[0].routeID)

        // let stations = [];
        // stations.push(arr.flatMap(({station}) => {
        //     return station.reduce((segments, current,) => {
        //         segments.push({
        //             name: current.stationName,
        //             departTime: current.stationDeparture
        //         });
        //         return segments;
        //     }, []);
        // }))
    }, [routeData, currentRoute])

    useEffect(() => {
        getTimeTable(currRouteId).then(res => setTimetableData(res))
    }, [currRouteId])

    const header = (trainNum) => {
        let arr = ['Station / Trip Order']
        for (let i = 1; i <= trainNum; i++) {
            arr.push(i.toString());
        }
        return (arr);
    }

    const row = (rowDatas) => {
        if (!_.isEmpty(rowDatas)) {

            let rows = []

            rowDatas.forEach(rowData => {
                let arr = [rowData.stationName], departTime = rowData.departTime;
                departTime.forEach(time => {
                    arr.push(time)
                })
                rows.push(arr);
            })

            return (rows)
        }
    }

    if (!_.isEmpty(timetableData))
        return (

            <Box className="default-font">

                <Box className="default-font blueFont bold timetableCurrentTitle">
                    {currentRoute}
                </Box>

                <TableContainer className="TableContainer">
                    <Table
                        className="table"
                    >
                        <TableHead className="header">
                            <TableRow className="row">
                                {header(timetableData.routeTrainNum).map((cell, i) =>
                                    <TableCell key={i} className="cell">{cell}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody className="body">
                            {
                                row(timetableData.FirstTable).map((row, i) =>
                                    <TableRow key={i} className="row">
                                        {
                                            row.map((cell, j) =>
                                                <TableCell key={j} className="cell">{cell}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>

                    <Table
                        className="table"
                    >
                        <TableHead className="header">
                            <TableRow className="row">
                                {header(timetableData.routeTrainNum).map((cell, i) =>
                                    <TableCell key={i} className="cell">{cell}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody className="body">
                            {
                                row(timetableData.SecondTable).map((row, i) =>
                                    <TableRow key={i} className="row">
                                        {
                                            row.map((cell, j) =>
                                                <TableCell key={j} className="cell">{cell}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>


        );

    else return null
}

export default Timetable;